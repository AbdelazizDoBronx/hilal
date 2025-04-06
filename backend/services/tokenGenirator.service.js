import jwt from 'jsonwebtoken'

export const generateToken = (user,res) => {
    
    const token = jwt.sign(user,process.env.JWT_SECRET_KEY,{expiresIn:'7d'});

    res.cookie('jwt',token,{
        maxAge  : 7*24*60*60*1000,
        sameSite: true,
        httpOnly: true
    })

    return token
}