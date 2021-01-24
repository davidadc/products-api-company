import { Router } from 'express';

import * as productController from '../controllers/products.controller';

import { authJwt } from './../middlewares';

const router = Router();

// CREATE
router.post(
  '/',
  [authJwt.verifyToken, authJwt.isModerator],
  productController.createProduct,
);

// READ
router.get('/', productController.listProducts);
router.get('/:id', productController.getProductById);

// UPDATE
router.put(
  '/:id',
  [authJwt.verifyToken, authJwt.isModerator],
  productController.updateProductById,
);

// DELETE
router.delete(
  '/:id',
  [authJwt.verifyToken, authJwt.isAdmin],
  productController.deleteProductById,
);

export default router;
