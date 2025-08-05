import express from 'express';
import {
  getMyProducts,
  getProductDetails,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getMyProducts); // /api/products
router.get('/:pid', getProductDetails); // /api/products/:pid

export default router;
