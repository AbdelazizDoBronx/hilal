import { query } from "../config/db.js"

export const registerService = async (userInfo) => {
    const {userName,userEmail,hashedPassword, role} = userInfo;
        const {rows} = await query('INSERT INTO users(userName,userEmail,userPassword,role) VALUES ($1,$2,$3,$4) RETURNING  *',[userName,userEmail,hashedPassword,role]);
        return rows[0];
}

export const findUserByEmail = async (userEmail) => {
    const {rows} = await query('SELECT * from users where userEmail = $1',[userEmail]) ;
    return rows[0];
}

