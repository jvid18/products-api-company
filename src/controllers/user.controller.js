import User from '../models/User';

export const getUsers = async (req, res) => {
	res.json('Getting users');
}

export const createUser = async (req, res) => {
	res.json('Creating user');
}
