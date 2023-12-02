import db from '../db.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export const registerUser = async (email, password) => {
	const user = await getUserByEmail(email);
	if (user.rows.length > 0) return new Error('User already exists!');

	const newUser = await db.query(
		'INSERT INTO gpt_users (email, password) VALUES ($1, $2) RETURNING id, email, settings',
		[email, password]
	);

	const veriCode = crypto.randomBytes(16).toString('hex');

	bcrypt.hash(veriCode, 10, async (err, hash) => {
		if (err) throw new Error(err);

		await db.query(
			'INSERT INTO gpt_verification (user_id, hash) VALUES ($1, $2)',
			[newUser.rows[0].id, hash]
		);
	});

	// TODO: Send verification email <-- this is a TODO because I don't have an email system set up yet
	console.log(veriCode);

	return newUser;
};

export const verifyUser = async (id, veriCode) => {
	const user = await getUserById(id);
	if (user.rows.length === 0) return new Error('User not found!');

	const veriHash = await db.query(
		'SELECT hash FROM gpt_verification WHERE user_id = $1',
		[user.rows[0].id]
	);
	if (veriHash.rows.length === 0) return new Error('Verification not found!');

	bcrypt.compare(veriCode, veriHash.rows[0].hash, (err, result) => {
		if (err) throw new Error(err);

		if (result) {
			db.query(
				`UPDATE gpt_users SET verified = true, credits = $1, date_modified = CURRENT_TIMESTAMP WHERE id = $2`,
				[user.rows[0].credits + 1000, user.rows[0].id]
			);
			db.query('DELETE FROM gpt_verification WHERE user_id = $1', [
				user.rows[0].id,
			]);
		}
	});
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

export default { registerUser, getUserByEmail, getUserById, verifyUser };
