import { Router } from 'express';

import * as productController from '../controllers/products.controller';

const router = Router();

// CREATE
router.post('/', productController.createProduct);

// READ
router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);

// UPDATE
router.put('/:id', productController.updateProductById);

// DELETE
router.delete('/:id', productController.deleteProductById);

export default router;
