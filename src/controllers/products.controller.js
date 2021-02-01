import Product from '../models/Product';
// import {} from 'express-validator';

export const getProducts = async (req, res) => {

	const outset = isNaN(req.query.outset)
		? 0 
		: parseInt(req.query.outset);

	const limit = isNaN(req.query.limit) 
		? 20 
		: parseInt(req.query.limit);

	const count = await Product.countDocuments();
	const results = await Product.find().skip(outset).limit(limit);

	res.json({ 
		count,
		next: null,
		previous: null,
		results,
	});
}

export const getProductById = async (req, res) => {
	const { productId } = req.params;

	const product = await Product.findById(productId);
	if (!product) {
		return res
			.status(404)
			.json({
				message: 'No product found',
			});
	}

	res.json(product);
}

export const createProduct = async (req, res) => {
	const { name, description, category, price, imgURL } = req.body;
	const newProduct = new Product ({ name, description, category, price, imgURL });

	const productSaved = await newProduct.save();

	res
		.status(201)
		.json(productSaved);
}

export const updateProductById = async (req, res) => {
	const { productId } = req.params;
	const { name, description, category, price, imgURL } = req.body;
	const product = { name, description, category, price, imgURL };
	const updatedProduct = await Product.findOneAndUpdate(productId, product, { new: true });

	res
		.status(201)
		.json(updatedProduct);

}

export const deleteProductbyId = async (req, res) => {
	const { productid } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(productid);

	res
		.status(204)
		.json();
}
