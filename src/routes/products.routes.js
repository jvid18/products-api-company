import { Router } from 'express';
const router = Router();

import * as productsCtrl from '../controllers/products.controller';
import { authJwt } from '../middlewares/index';
import { checkValidations, productValidator } from '../middlewares/validators';

router.get('/', productsCtrl.getProducts);

router.get('/:productId', productsCtrl.getProductById);

router.post('/', [
	authJwt.verifyToken, 
	authJwt.isModerator,
	productValidator.validateNewProduct,
	checkValidations
], productsCtrl.createProduct);

router.put('/:productId', [ authJwt.verifyToken, authJwt.isModerator ], productsCtrl.updateProductById);

router.delete('/:productId', [ authJwt.verifyToken, authJwt.isAdmin ], productsCtrl.deleteProductbyId);

export default router;
