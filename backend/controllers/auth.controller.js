import bcrypt from 'bcrypt';
import { findUserByEmail, registerService } from "../services/auth.service.js";
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

        const { userPassword, userEmail, userName } = validatedUser;

        // Check if user already exists
        const existingUser = await findUserByEmail(userEmail);
        if (existingUser) {
            errors.userEmail = 'Email already registered';
            return res.status(400).json(errors)
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        // Create user
        const createdUser = await registerService({ userName, userEmail, hashedPassword });

        if (!createdUser) {
            return res.status(400).json({ message: "Invalid user data" });
        }

        // Generate token & attach to response 
        const token = generateToken(createdUser, res);

        return res.status(201).json({
            message: "User registered successfully",
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


        const token = generateToken(user, res);
        return res.status(200).json({ message: "Login successful" });

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

        return res.status(200).json({ message: "Authenticated", user });
    } catch (err) {
        console.error("Auth Check Error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
