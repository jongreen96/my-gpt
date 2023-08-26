const db = require('../db');
const bcrypt = require('bcrypt');
const { validateEmail, validatePassword } = require('../utils/validation');

module.exports = {
	getUserById: async (id) => {
		const user = await db.query(
			`SELECT id, email, tokens FROM mygpt_admins WHERE id = $1`,
			[id]
		);
		const settings = await db.query(
			`SELECT * FROM mygpt_settings WHERE admin_id = $1`,
			[id]
		);
		user.rows[0].settings = settings.rows[0];
		return user.rows[0];
	},
	getUser: async (email, password) => {
		const user = await db.query(
			`SELECT id, email, password, tokens FROM mygpt_admins WHERE email = $1`,
			[email.toLowerCase()]
		);
		if (!user.rows[0]) return null;

		const isPasswordCorrect = await bcrypt.compare(
			password,
			user.rows[0].password
		);
		if (!isPasswordCorrect) return null;

		const settings = await db.query(
			`SELECT * FROM mygpt_settings WHERE admin_id = $1`,
			[user.rows[0].id]
		);

		return {
			id: user.rows[0].id,
			email: user.rows[0].email,
			tokens: user.rows[0].tokens,
			settings: settings.rows[0],
		};
	},
	createNewUser: async (email, password) => {
		if (!validateEmail(email)) return null;
		if (!validatePassword(password)) return null;

		const encryptedPassword = await bcrypt.hash(password, 10);
		const user = await db.query(
			`INSERT INTO mygpt_admins (email, password) VALUES ($1, $2) RETURNING *`,
			[email.toLowerCase(), encryptedPassword]
		);
		const settings = await db.query(
			`INSERT INTO mygpt_settings (admin_id) VALUES ($1) RETURNING *`,
			[user.rows[0].id]
		);
		user.rows[0].settings = settings.rows[0];
		return user.rows[0];
	},
	updateUserSettings: async (id, setting, value) => {
		const updatedSettings = await db.query(
			`UPDATE mygpt_settings SET
			${setting} = $1
			WHERE admin_id = $2
			RETURNING *`,
			[value, id]
		);
		return updatedSettings.rows[0];
	},
	calculateUsage: async (id, tokens) => {
		const usage = await db.query(
			`SELECT * FROM mygpt_usage WHERE admin_id = $1 AND date = $2`,
			[id, new Date().toISOString().slice(0, 7)]
		);

		let newUsage;

		if (usage.rows[0]) {
			newUsage = await db.query(
				`UPDATE mygpt_usage SET tokens_used = tokens_used + $1 WHERE admin_id = $2 AND date = $3 RETURNING *`,
				[tokens, id, new Date().toISOString().slice(0, 7)]
			);
		} else {
			newUsage = await db.query(
				`INSERT INTO mygpt_usage (admin_id, tokens_used, date) VALUES ($1, $2, $3, $4) RETURNING *`,
				[id, tokens, new Date().toISOString().slice(0, 7)]
			);
		}
	},
	getUserUsage: async (id) => {
		const usage = await db.query(
			`SELECT * FROM mygpt_usage WHERE admin_id = $1 ORDER BY date DESC`,
			[id]
		);
		return usage.rows;
	},
};
