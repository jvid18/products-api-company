import { checkSchema } from 'express-validator';

export const validateNewProduct = checkSchema({
	name: {
		isEmpty: {
			errorMessage: 'The name is required',
		},
		isLength: {
			errorMessage: 'Name should be at least 3 chars long',
			options: { min: 3 },
		}
	},
	description: {
		isString: {
			errorMessage: 'The field should a string',
		},
	},
	price: {
		isNumeric: {
			errorMessage: 'The price most numeric',
		}
	},
	imgURL: {
		isURL: {
			errorMessage: 'Img showuld a URL',
		}
	}
})
