import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { authenticateToken, generateAccessToken } from '../middleware/jwt.js';
import { validateUser } from '../middleware/user.js';
import sendVerification from '../middleware/email.js';
import userQueries from '../db/queries/userQueries.js';
import cache from '../middleware/chache.js';

const userRouter = express.Router();

userRouter.get('/user', authenticateToken, async (req, res) => {
	const cachedUser = cache.get(req.user.id);
	if (cachedUser) {
		return res.json({ user: cachedUser });
	}

	try {
		const user = await userQueries.getUserById(req.user.id);
		if (user instanceof Error) throw user;

		delete user.rows[0].password;
		cache.set(req.user.id, user.rows[0], 3600);

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

		cache.set(newUser.rows[0].id, newUser.rows[0], 3600);

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

		const cachedUser = cache.get(user.rows[0].id);
		if (cachedUser)
			await userQueries.saveCachedUser(user.rows[0].id, cachedUser);

		bcrypt.compare(password, user.rows[0].password, (err, result) => {
			if (err) throw new Error(err);
			if (!result)
				return res.status(401).json({ error: 'Incorrect password!' });

			delete user.rows[0].password;

			const accessToken = generateAccessToken({ id: user.rows[0].id });

			if (cachedUser) return res.json({ accessToken, user: cachedUser });

			cache.set(user.rows[0].id, user.rows[0], 3600);
			res.json({ accessToken, user: user.rows[0] });
		});
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

userRouter.post('/logout', authenticateToken, async (req, res) => {
	try {
		cache.del(req.user.id);

		res.json({ message: 'User logged out!' });
	} catch (e) {
		res.status(500).json({ error: e.message });
	}
});

userRouter.patch('/user', authenticateToken, async (req, res) => {
	try {
		const { id } = req.user;

		let cachedUser = cache.get(id);
		if (cachedUser) {
			cache.set(id, { ...cachedUser, ...req.body }, 3600);
			cachedUser = cache.get(id);
			return res.json({ user: cachedUser });
		}

		const user = await userQueries.getUserById(id);
		if (user instanceof Error) throw user;

		if (req.body.newPassword) {
			const { oldPassword, newPassword } = req.body;

			if (!RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/).test(newPassword))
				return res.status(400).json({
					error:
						'Password must be at least 8 characters long and contain at least one number!',
				});

			const result = bcrypt.compareSync(oldPassword, user.rows[0].password);
			if (!result)
				return res.status(401).json({ error: 'Incorrect password!' });

			req.body.password = bcrypt.hashSync(newPassword, 10);
			delete req.body.oldPassword;
			delete req.body.newPassword;
		}

		const updatedUser = await userQueries.updateUser(id, req.body);

		if (updatedUser instanceof Error) throw updatedUser;

		res.json({ user: updatedUser });
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: e.message });
	}
});

export default userRouter;
