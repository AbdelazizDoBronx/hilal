import express from 'express'
import { deleteProduct, getAllProducts ,insertNewProduct, updateProduct} from '../controllers/product.controller.js';

const router = express.Router();


router.get('/products',getAllProducts);
router.post('/products',insertNewProduct);
router.put('/products/:id',updateProduct);
router.delete('/products/:id',deleteProduct)


export default router;