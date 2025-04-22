import bcrypt from 'bcrypt';
import { findUserByEmail, registerService, updateProfileService } from "../services/auth.service.js";
import { loginSchemaValidator, registerSchemaValidator } from "../validator/auth.validator.js";
import { generateToken } from '../services/tokenGenirator.service.js';

export const register = async (req, res) => {
    try {
        const errors = {};
        const { error, value: validatedUser } = registerSchemaValidator(req.body);

        if (error) {
            error.details.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            return res.status(400).json({ errors });
        }

        const { userPassword, userEmail, userName, secretKey } = validatedUser;

        // Check if user already exists
        const existingUser = await findUserByEmail(userEmail);
        if (existingUser) {
            errors.userEmail = 'Email already registered';
            return res.status(400).json(errors)
        }

        let role = 'user';
        if (secretKey) {
            if (secretKey === process.env.JWT_SECRET_KEY) {
                role = 'admin';
            } else {
                return res.status(400).json({ message: "Invalid secret key" });
            }
        }


        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        // Create user
        const createdUser = await registerService({ userName, userEmail, hashedPassword, role });

        if (!createdUser) {
            return res.status(400).json({ message: "Invalid user data" });
        }

        // Generate token & attach to response 
        const token = generateToken(createdUser, res);

        return res.status(201).json({
            message: "User registered successfully",
            token,
        });

    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { error, value: validatedData } = loginSchemaValidator(req.body);

        if (error) {
            const errors = {};
            error.details.forEach(err => {
                errors[err.path[0]] = err.message;
            });
            return res.status(400).json({ errors });
        }

        const { userEmail, userPassword} = validatedData;

        // Check if user exists
        const user = await findUserByEmail(userEmail);
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(userPassword, user.userpassword);
        
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        const userForToken = {
            id: user.id,
            username: user.username,
            useremail: user.useremail,
            role: user.role  
        };

        const token = generateToken(userForToken, res);
        return res.status(200).json({
             message: "Login successful",
             token,
             user: userForToken
        });

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
         // clears the token cookie or header
         res.cookie("jwt", "", { maxAge: 0 });
         return res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Server error",err });
    }
};

export const checkAuth = async (req, res) => {
    try {
        // middleware will check if there is a token in cookies if true middleware will set up that token in request object. so we can access it
        const user = req.user; 
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userData = {
            id: user.id,
            username: user.username,
            useremail: user.useremail,
            role: user.role  
        };

        return res.status(200).json({ message: "Authenticated", userData });
    } catch (err) {
        console.error("Auth Check Error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { username, useremail } = req.body;
        const userId = req.user.id;

        // Validate input
        if (!username || !useremail) {
            return res.status(400).json({ 
                message: "Username and email are required" 
            });
        }

        // Update profile using service
        const updatedUser = await updateProfileService(userId, username, useremail);

        res.json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                useremail: updatedUser.useremail,
                role: updatedUser.role
            }
        });

    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ 
            message: "Failed to update profile",
            error: error.message 
        });
    }
};
