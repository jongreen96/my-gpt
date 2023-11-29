import db from '../db.js';

export const registerUser = async (email, password) => {
	const newUser = await db.query(
		'INSERT INTO gpt_users (email, password) VALUES ($1, $2) RETURNING id, email, credits, settings',
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

export default { registerUser, getUserByEmail };
