import db from '../db.js';

export const registerUser = async (email, password) => {
	const user = await getUserByEmail(email);
	if (user.rows.length > 0) return new Error('User already exists!');

	const newUser = await db.query(
		'INSERT INTO gpt_users (email, password, credits) VALUES ($1, $2, 1000) RETURNING id, email, credits, settings',
		[email, password]
	);
	return newUser;
};

export const getUserByEmail = async (email) => {
	const user = await db.query(
		'SELECT id, email, password, credits, settings FROM gpt_users WHERE email = $1',
		[email]
	);
	return user;
};

export const getUserById = async (id) => {
	const user = await db.query(
		'SELECT id, email, credits, settings FROM gpt_users WHERE id = $1',
		[id]
	);
	return user;
};

export default { registerUser, getUserByEmail, getUserById };
