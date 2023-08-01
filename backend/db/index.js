const { Pool } = require('pg');

// const pool = new Pool({
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	host: process.env.DB_HOST,
// 	database: process.env.DB_DATABASE,
// 	port: process.env.DB_PORT,
// });

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
