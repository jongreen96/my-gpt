import express from 'express';
import bcrypt from 'bcrypt';
import { query } from '../utils/db.js';
import { generateAccessToken, authenticateToken } from '../utils/jwt.js';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
	try {
		const { email, password } = req.body;

		bcrypt.hash(password, 10, async (err, hash) => {
			if (err) throw new Error(err);
			const newUser = await query(
				'INSERT INTO gpt_users (email, password) VALUES ($1, $2) RETURNING *',
				[email, hash]
			);
			const accessToken = generateAccessToken({ id: newUser.rows[0].id });
			res.json({ accessToken });
		});
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

userRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await query('SELECT * FROM gpt_users WHERE email = $1', [
			email,
		]);
		if (user.rows.length === 0) {
			return res.status(404).json({ error: 'User not found!' });
		}
		bcrypt.compare(password, user.rows[0].password, (err, result) => {
			if (err) throw new Error(err);
			if (!result) {
				return res.status(401).json({ error: 'Incorrect password!' });
			}
			const accessToken = generateAccessToken({ id: user.rows[0].id });
			res.json({ accessToken });
		});
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

export default userRouter;
