import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
    addToCart,
    getCartItems,
    updateCartItem,
    removeCartItem,
    clearCart
} from '../controllers/cart.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/cart', getCartItems);
router.post('/cart/items', addToCart);
router.put('/cart/items/:cartItemId', updateCartItem);
router.delete('/cart/items/:cartItemId', removeCartItem);
router.delete('/cart', clearCart);

export default router;