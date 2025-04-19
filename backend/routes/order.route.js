import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { 
    createOrder, 
    getOrders
} from '../controllers/order.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/orders', createOrder);
router.get('/orders', getOrders);

export default router;