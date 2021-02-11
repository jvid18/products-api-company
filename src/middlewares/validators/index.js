import { validationResult } from 'express-validator';
import * as productValidator from './products.validator';

const checkValidations = (req, res, next) => {
	const errors = validationResult(req); 
	if (errors) return res.status(400).json(errors.array());

	next();
}

export { checkValidations, productValidator };
