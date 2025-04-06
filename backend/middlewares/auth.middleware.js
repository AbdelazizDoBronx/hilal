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

    if(!decode){
        return res.status(402).json({
            message: "bad token"
        })
    }

    const {username,useremail,id}  = decode;
    const user = {useremail,username,id};
    
    req.user = user;

    next();
}