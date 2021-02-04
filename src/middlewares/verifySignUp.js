import Role from '../models/Role';
import User from '../models/User';

export const checkRolesExisted = async (req, res, next) => {
	const { roles } = req.body;
	if ( roles ) {
		const rolesDB = await Role.find({});
		const roleNamesDB = rolesDB.map(({ name }) => name);

		const rolesNotFound = roles.reduce((acc, role) => {
			const newAcc = [...acc];

			if (!roleNamesDB.includes(role)) newAcc.push(role);
			
			return newAcc;
		}, []);

		if (rolesNotFound.length) {
			const joined = rolesNotFound.join(', ');
			return res.status(400).json({
				message: `Role(s) ${joined} does not exists`,
			})
		}
	}
	
	next();
}

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
	const { username, email } = req.body;

	const existsUsername = await User.findOne({ username }); 
	if (existsUsername) return res.status(400).json({
		message: 'The username already exists',
	});

	const existsEmail = await User.findOne({ email }); 
	if (existsEmail) return res.status(400).json({
		message: 'The email already exists',
	});

	next();
}
