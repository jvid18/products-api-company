import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import config from './config';

import { createRoles } from './libs/initialSetup';

// Routes
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app = express();
createRoles();

// Settings
app.set('pkg', pkg);
app.set('port', config.PORT);

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
app.use('/api/products', productsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

export default app;
