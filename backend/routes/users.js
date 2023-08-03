const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {
	getUser,
	createNewUser,
	getUserById,
	updateUserSettings,
} = require('../queries/users');
const authenticateToken = require('../utils/jwt');

router.get('/', authenticateToken, async (req, res) => {
	try {
		const { id } = req.user;
		const user = await getUserById(id);
		res.send(user);
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await getUser(email, password);
		if (!user) {
			res.status(400).send('Invalid username or password');
			return;
		}

		const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
		res.json({ accessToken, user });
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.post('/register', async (req, res) => {
	try {
		const { email, password, accountName } = req.body;

		const newUser = await createNewUser(email, password, accountName);
		const accessToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
		res.json({ accessToken, newUser });
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.put('/settings', authenticateToken, async (req, res) => {
	try {
		const { id } = req.user;
		const { setting, value } = req.body;
		const updatedSettings = await updateUserSettings(id, setting, value);
		res.send(updatedSettings);
	} catch (error) {
		res.status(500).send('Server error');
	}
});

module.exports = router;
