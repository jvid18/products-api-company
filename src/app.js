import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';

// Routes
import productsRoutes from './routes/products.routes';

const app = express();

// Settings
app.set('pkg', pkg);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
	res.json({
		name: app.get('pkg').name,
		author: app.get('pkg').author,
		description: app.get('pkg').description,
		version: app.get('pkg').version,
	});
});

// Products
app.use('/products', productsRoutes);

export default app;
