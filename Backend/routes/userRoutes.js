import express from 'express';
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

		// TODO: Validate email and password

		bcrypt.hash(password, 10, async (err, hash) => {
			if (err) throw new Error(err);

			const newUser = await userQueries.registerUser(email, hash);
			if (newUser instanceof Error)
				return res.status(409).json({ error: newUser.message });

			const accessToken = jwt.generateAccessToken({ id: newUser.rows[0].id });

			res.json({ accessToken, user: newUser.rows[0] });
		});
	} catch (e) {
		res.status(500).json({ error: e.message });
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
