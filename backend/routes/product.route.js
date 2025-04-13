import express from 'express'
import { deleteProduct, getAllProducts ,insertNewProduct, updateProduct} from '../controllers/product.controller.js';
import { authMiddleware ,adminMiddleware } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.get('/products',getAllProducts);

// Admin only routes
router.post('/products',authMiddleware, adminMiddleware,insertNewProduct);
router.put('/products/:id',authMiddleware, adminMiddleware,updateProduct);
router.delete('/products/:id',authMiddleware, adminMiddleware,deleteProduct)


export default router;