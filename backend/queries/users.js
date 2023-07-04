const db = require('../db');

module.exports = {
	getUserById: async (id) => {
		const user = await db.query(`SELECT * FROM admins WHERE id = $1`, [id]);
		return user.rows[0];
	},
	getUser: async (email, password) => {
		const user = await db.query(
			`SELECT * FROM admins WHERE email = $1 AND password = $2`,
			[email, password]
		);
		return user.rows[0];
	},
	createNewUser: async (email, password, accountName) => {
		const user = await db.query(
			`INSERT INTO admins (email, password, username) VALUES ($1, $2, $3) RETURNING *`,
			[email, password, accountName]
		);
		return user.rows[0];
	},
};
