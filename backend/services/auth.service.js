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

export const updateProfileService = async (userId, username, useremail) => {
    // Check if email exists (excluding current user)
    const checkEmail = await query(
        'SELECT * FROM users WHERE useremail = $1 AND id != $2',
        [useremail, userId]
    );

    if (checkEmail.rows.length > 0) {
        throw new Error("Email is already in use");
    }

    // Update user
    const result = await query(
        'UPDATE users SET username = $1, useremail = $2 WHERE id = $3 RETURNING id, username, useremail, role',
        [username, useremail, userId]
    );

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    return result.rows[0];
};
