import jwt from 'jsonwebtoken'

export const authMiddleware  =  (req,res,next) => {
    // get token from request object
    const token = req.cookies.jwt;
    if(!token){
        return res.status(403).json({
            message: "access denied! Unauthoriezed"
        })
    }

    // decode token using jsonwebtoken
    const decode =  jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = {
        username: decode.username,
        useremail: decode.useremail,
        id: decode.id,
        role: decode.role
    };
    next();
    if(!decode){
        return res.status(402).json({
            message: "bad token"
        })
    }

    const {username,useremail,id}  = decode;
    const user = {useremail,username,id};
    
    req.user = user;

    
}

export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({
            message: "Access denied! Admin rights required"
        });
    }
}
