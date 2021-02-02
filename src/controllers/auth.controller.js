import User from '../models/User';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signUp = async (req, res) => {
	const { username, email, password, roles } = req.body; 

	const newUser = new User({
		username,
		email,
		password: await User.encryptPassword(password),
	});

	if (roles) {
		const foundRoles = await Role.find({ name: { $in: roles } });
		newUser.roles = foundRoles.map(role => role._id);
	} else {
		const role = await Role.findOne({ name: 'user' });
		newUser.roles = [ role._id ];
	}

	const { id } = await newUser.save();

	const token = jwt.sign({ id }, config.SECRET_KEY, {
		expiresIn: 60 * 60,
	});

	res
		.status(201)
		.json({ token });
}

export const signIn = async (req, res) => {
	const { email, password } = req.body;

	const userFound = await User.findOne({ email }).populate('roles');
	if (!userFound) return res.status(404).json({ message: 'Invalid credentials' });

	const matchPassword = await User.comparePassword(password, userFound.password);
	if (!matchPassword) return res.status(401).json({ message: 'Invalid credentials' });

	const token = jwt.sign({ id: userFound._id }, config.SECRET_KEY, {
		expiresIn: 60 * 60,
	});

	res.json({ token });
}
