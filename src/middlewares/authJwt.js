import jwt from 'jsonwebtoken';
import config from '../config';

import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = (req, res, next) => {
	const token = req.headers['x-access-token'];
	if (!token) return res.status(403).json({ message: 'Token no provided' });

	try {
		const { id } = jwt.verify(token, config.SECRET_KEY);
		req.userId = id;

		const user = User.findById(id, { password: 0 });
		if (!user) return res.status(404).json({ message: 'No user found' });

		next();
	} catch(err) {
		console.log(err);
		if (err.name === 'JsonWebTokenError')
			return res.status(401).json({ message: 'Unautorized' });
		else if (err.name === 'TokenExpiredError')
			return res.status(401).json({ message: 'Token expired' });

		res.status(500).json({ message: 'Error' });
	}
}

const findUserRole = async (userId, findRole) => {
	const user = await User.findById(userId);
	const roles = await Role.find({ _id: { $in: user.roles } });
	const roleNames = roles.map(({ name }) => name);

	return roleNames.includes(findRole);
}

export const isModerator = async (req, res, next) => {
	
	const hasRole = await findUserRole(req.userId, 'moderator');
	
	if (!hasRole) return res.status(403).json({ message: 'Require Moderator Role' });
	
	next();
}

export const isAdmin = async (req, res, next) => {
	const hasRole = await findUserRole(req.userId, 'admin');
	
	if (!hasRole) return res.status(403).json({ message: 'Require Admin Role' });
	
	next();
}
