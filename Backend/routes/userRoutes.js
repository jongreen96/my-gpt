import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { authenticateToken, generateAccessToken } from '../middleware/jwt.js';
import { validateUser } from '../middleware/user.js';
import sendVerification from '../middleware/email.js';
import userQueries from '../db/queries/userQueries.js';

const userRouter = express.Router();

userRouter.get('/user', authenticateToken, async (req, res) => {
	try {
		const user = await userQueries.getUserById(req.user.id);
		if (user instanceof Error) throw user;
		res.json({ user: user.rows[0] });
	} catch (e) {
		res.status(404).json({ error: e.message });
	}
});

userRouter.post('/register', validateUser, async (req, res) => {
	try {
		let { email, password } = req.body;

		const veriCode = crypto.randomBytes(16).toString('hex');
		const hash = bcrypt.hashSync(password, 10);
		const veriHash = bcrypt.hashSync(veriCode, 10);

		const newUser = await userQueries.registerUser(email, hash, veriHash);
		if (newUser instanceof Error)
			return res.status(409).json({ error: newUser.message });

		// NEED TO CHANGE THIS TO THE ACTUAL URL
		sendVerification(
			email,
			`http://localhost:5173/verification?id=${newUser.rows[0].id}&veriCode=${veriCode}`
		);

		const accessToken = generateAccessToken({ id: newUser.rows[0].id });

		res.json({ accessToken, user: newUser.rows[0], veriCode });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

userRouter.post('/verify', async (req, res) => {
	try {
		let { id, veriCode } = req.body;

		if (!id || !veriCode)
			return res.status(400).json({ error: 'Missing fields!' });

		const verified = await userQueries.verifyUser(id, veriCode);

		if (verified instanceof Error) throw verified;

		res.json({ message: 'User verified!' });
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

userRouter.post('/login', validateUser, async (req, res) => {
	try {
		let { email, password } = req.body;

		const user = await userQueries.getUserByEmail(email);
		if (user.rows.length === 0)
			return res.status(404).json({ error: 'User not found!' });

		bcrypt.compare(password, user.rows[0].password, (err, result) => {
			if (err) throw new Error(err);
			if (!result)
				return res.status(401).json({ error: 'Incorrect password!' });

			delete user.rows[0].password;
			const accessToken = generateAccessToken({ id: user.rows[0].id });

			res.json({ accessToken, user: user.rows[0] });
		});
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

export default userRouter;
