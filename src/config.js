import dotenv from 'dotenv'
dotenv.config();

export default {
	PORT: process.env.PORT || 3000,
	DB_URL: ( process.env.DB_URL || 'mongodb://localhost/companydb' ),
	SECRET_KEY: process.env.SECRET_KEY || 'jhkgy/&tcasyarsasa244yt',
}
