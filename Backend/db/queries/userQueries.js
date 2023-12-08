import db from '../db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (email, password, veriHash) => {
	const user = await getUserByEmail(email);
	if (user.rows.length > 0) return new Error('User already exists!');

	const newUser = await db.query(
		'INSERT INTO gpt_users (email, password) VALUES ($1, $2) RETURNING id, email, settings',
		[email, password]
	);

	db.query('INSERT INTO gpt_verification (user_id, hash) VALUES ($1, $2)', [
		newUser.rows[0].id,
		veriHash,
	]);

	return newUser;
};

export const verifyUser = async (id, veriCode) => {
	try {
		const user = await getUserById(id);
		if (user.rows.length === 0) throw new Error('User not found!');

		const veriHash = await db.query(
			'SELECT hash FROM gpt_verification WHERE user_id = $1',
			[id]
		);

		if (veriHash.rows.length === 0) throw new Error('Verification not found!');

		const verified = bcrypt.compareSync(veriCode, veriHash.rows[0].hash);
		if (!verified) throw new Error('Verification failed!');

		db.query(
			`UPDATE gpt_users SET verified = true, credits = $1, date_modified = CURRENT_TIMESTAMP WHERE id = $2`,
			[user.rows[0].credits + 1000, id]
		);
		db.query('DELETE FROM gpt_verification WHERE user_id = $1', [id]);
	} catch (e) {
		return e;
	}
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
		'SELECT id, email, password, credits, settings FROM gpt_users WHERE id = $1',
		[id]
	);
	if (user.rows.length === 0) return new Error('User not found!');
	return user;
};

export const updateUser = async (id, updates) => {
	const user = await getUserById(id);
	if (user instanceof Error) return user;

	const updateKeys = Object.keys(updates);
	const updateValues = Object.values(updates);
	const updateSet = updateKeys
		.map((key, index) => `${key} = $${index + 2}`)
		.join(', ');

	const updatedUser = await db.query(
		`UPDATE gpt_users SET ${updateSet}, date_modified = CURRENT_TIMESTAMP WHERE id = $1`,
		[id, ...updateValues]
	);

	return updatedUser.rows[0];
};

export const saveCachedUser = async (id, user) => {
	await db.query(
		`UPDATE gpt_users SET settings = $1, date_modified = CURRENT_TIMESTAMP WHERE id = $2`,
		[user.settings, id]
	);
};

export default {
	registerUser,
	getUserByEmail,
	getUserById,
	verifyUser,
	updateUser,
	saveCachedUser,
};
