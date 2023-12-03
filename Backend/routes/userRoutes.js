import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from '../middleware/jwt.js';
import userQueries from '../db/queries/userQueries.js';

const userRouter = express.Router();

userRouter.get('/user', jwt.authenticateToken, async (req, res) => {
	try {
		const user = await userQueries.getUserById(req.user.id);
		res.json({ user: user.rows[0] });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

userRouter.post('/register', async (req, res) => {
	try {
		let { email, password } = req.body;
		email = email.toLowerCase();

		if (!email || !password)
			return res.status(400).json({ error: 'Missing fields!' });

		if (!RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(email))
			return res.status(400).json({ error: 'Invalid email!' });

		if (!RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/).test(password))
			return res.status(400).json({
				error:
					'Password must be at least 8 characters long and contain at least one number!',
			});

		const veriCode = crypto.randomBytes(16).toString('hex');
		const hash = bcrypt.hashSync(password, 10);
		const veriHash = bcrypt.hashSync(veriCode, 10);
		const newUser = await userQueries.registerUser(email, hash, veriHash);

		if (newUser instanceof Error)
			return res.status(409).json({ error: newUser.message });

		// TODO: Send email with verification code
		console.log(veriCode);

		const accessToken = jwt.generateAccessToken({ id: newUser.rows[0].id });

		res.json({ accessToken, user: newUser.rows[0] });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

userRouter.post('/verify', async (req, res) => {
	try {
		let { id, veriCode } = req.query;

		if (!id || !veriCode)
			return res.status(400).json({ error: 'Missing fields!' });

		const verified = await userQueries.verifyUser(id, veriCode);

		if (verified instanceof Error) throw verified;

		res.json({ message: 'User verified!' });
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

userRouter.post('/login', async (req, res) => {
	try {
		let { email, password } = req.body;
		email = email.toLowerCase();

		const user = await userQueries.getUserByEmail(email);
		if (user.rows.length === 0)
			return res.status(404).json({ error: 'User not found!' });

		bcrypt.compare(password, user.rows[0].password, (err, result) => {
			if (err) throw new Error(err);
			if (!result)
				return res.status(401).json({ error: 'Incorrect password!' });

			delete user.rows[0].password;
			const accessToken = jwt.generateAccessToken({ id: user.rows[0].id });

			res.json({ accessToken, user: user.rows[0] });
		});
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

export default userRouter;
