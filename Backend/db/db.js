import pg from 'pg';

const pool = new pg.Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

export const query = async (text, params, callback) => {
	return pool.query(text, params, callback);
};

export default { query };
