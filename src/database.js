import mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
	useCreateIndex: true,
})
	.then(db => console.log('Database is connected'))
	.catch(err => console.error(err));
