import express from 'express';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';
import { 
    createOrder, 
    getOrders,
    deleteOrder
} from '../controllers/order.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.delete('/orders/:orderId', adminMiddleware, deleteOrder); 

export default router;