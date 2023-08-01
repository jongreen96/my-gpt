const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = {
	query: async (text, params) => await pool.query(text, params),
	pool,
};
