import { query } from "../config/db.js"

export const registerService = async (userInfo) => {
    const {userName,userEmail,hashedPassword} = userInfo;
        const {rows} = await query('INSERT INTO users(userName,userEmail,userPassword) VALUES ($1,$2,$3) RETURNING  *',[userName,userEmail,hashedPassword]);
        return rows[0];
}

export const findUserByEmail = async (userEmail) => {
    const {rows} = await query('SELECT * from users where userEmail = $1',[userEmail]) ;
    return rows[0];
}

