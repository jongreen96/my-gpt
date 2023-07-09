const db = require('../db');
const bcrypt = require('bcrypt');

module.exports = {
	getUserById: async (id) => {
		const user = await db.query(
			`SELECT id, email, username, tokens FROM admins WHERE id = $1`,
			[id]
		);
		const settings = await db.query(
			`SELECT * FROM settings WHERE admin_id = $1`,
			[id]
		);
		user.rows[0].settings = settings.rows[0];
		return user.rows[0];
	},
	getUser: async (email, password) => {
		const user = await db.query(
			`SELECT id, email, password, username, tokens FROM admins WHERE email = $1`,
			[email]
		);
		if (!user.rows[0]) return null;

		const isPasswordCorrect = await bcrypt.compare(
			password,
			user.rows[0].password
		);
		if (!isPasswordCorrect) return null;

		const settings = await db.query(
			`SELECT * FROM settings WHERE admin_id = $1`,
			[user.rows[0].id]
		);

		return {
			id: user.rows[0].id,
			email: user.rows[0].email,
			username: user.rows[0].username,
			tokens: user.rows[0].tokens,
			settings: settings.rows[0],
		};
	},
	createNewUser: async (email, password, accountName) => {
		const encryptedPassword = await bcrypt.hash(password, 10);
		const user = await db.query(
			`INSERT INTO admins (email, password, username) VALUES ($1, $2, $3) RETURNING *`,
			[email, encryptedPassword, accountName]
		);
		const settings = await db.query(
			`INSERT INTO settings (admin_id) VALUES ($1) RETURNING *`,
			[user.rows[0].id]
		);
		user.rows[0].settings = settings.rows[0];
		return user.rows[0];
	},
};
