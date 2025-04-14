import {
    getCartItemsService,
    updateCartItemService,
    removeCartItemService,
    clearCartService
} from '../services/cart.service.js';
import { query } from '../config/db.js';

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity, cart_item_id } = req.body;

        // Validate required fields
        if (!productId || !quantity || !cart_item_id) {
            return res.status(400).json({
                message: 'Missing required fields: productId, quantity, or cart_item_id'
            });
        }

        // Check if product exists
        const productExists = await query(
            'SELECT id FROM products WHERE id = $1',
            [productId]
        );

        if (productExists.rows.length === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Check if product already exists in user's cart
        const existingItem = await query(
            'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
            [userId, productId]
        );

        let result;
        if (existingItem.rows.length > 0) {
            // Update existing item's quantity
            result = await query(
                'UPDATE cart_items SET quantity = quantity + $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND product_id = $3 RETURNING *',
                [quantity, userId, productId]
            );
        } else {
            // Create new cart item
            result = await query(
                'INSERT INTO cart_items (cart_item_id, product_id, user_id, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
                [cart_item_id, productId, userId, quantity]
            );
        }

        // Join with products table to get product details
        const cartItem = await query(
            `SELECT ci.*, p.name, p.price 
             FROM cart_items ci 
             JOIN products p ON ci.product_id = p.id 
             WHERE ci.cart_item_id = $1`,
             [result.rows[0].cart_item_id]
        );

        res.status(201).json(cartItem.rows[0]);

    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({
            message: 'Failed to add item to cart',
            error: error.message
        });
    }
};
export const getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartItems = await getCartItemsService(userId);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error getting cart items:', error);
        res.status(500).json({ message: 'Failed to get cart items' });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        if (!cartItemId) {
            return res.status(400).json({ message: 'Cart item ID is required' });
        }
        const updatedItem = await updateCartItemService(cartItemId, quantity);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Failed to update cart item' });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const removed = await removeCartItemService(cartItemId);
        if (!removed) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ message: 'Failed to remove cart item' });
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;
        await clearCartService(userId);
        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Failed to clear cart' });
    }
};
