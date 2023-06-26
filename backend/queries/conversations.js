const db = require('../db');

module.exports = {
	getAllConversations: async (id) => {
		const query = `
            SELECT conversation FROM conversations
            WHERE user_id = $1 
            OR admin_id = $1
        `;
		const values = [id];
		const { rows } = await db.query(query, values);
		return rows;
	},
};
