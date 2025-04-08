import express from 'express'
import { getAllOrders, insertNewOrder } from '../controllers/order.controller.js';


const router = express.Router();



router.get('/orders',getAllOrders);
router.post('/orders',insertNewOrder);


export default router;