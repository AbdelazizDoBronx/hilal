import { query } from "../config/db.js";

export const addToCartService = async (cartItem) => {
    const { productId, quantity, cart_item_id, userId } = cartItem;
    const { rows } = await query(
        'INSERT INTO cart_items (product_id, quantity, cart_item_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [productId, quantity, cart_item_id, userId]
    );
    return rows[0];
};

export const getCartItemsService = async (userId) => {
    const { rows } = await query(`
        SELECT ci.*, p.name, p.price, u.username as added_by
        FROM cart_items ci 
        JOIN products p ON ci.product_id = p.id 
        JOIN users u ON ci.user_id = u.id 
        WHERE ci.user_id = $1
    `, [userId]);
    return rows;
};

export const updateCartItemService = async (cartItemId, quantity) => {
    const { rows } = await query(
        'UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2 RETURNING *',
        [quantity, cartItemId]
    );
    return rows[0];
};

export const removeCartItemService = async (cartItemId) => {
    const { rowCount } = await query('DELETE FROM cart_items WHERE cart_item_id = $1', [cartItemId]);
    return rowCount > 0;
};

export const clearCartService = async (userId) => {
    const { rowCount } = await query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
    return rowCount > 0;
};

