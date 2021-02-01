import { Schema, model } from 'mongoose';

const productSchema = new Schema({
	name: String,
	description: String,
	category: String,
	price: Number,
	imgURL: String,
}, {
	timestamps: true,
	versionKey: false,
});


export default model('Product', productSchema);
