const db = require('../db');

module.exports = {
	getAllConversations: async () => {
		const result = await db.query(
			'SELECT id, subject, conversation FROM conversations'
		);
		return result.rows;
	},
	updateConversation: async (id, conversation) => {
		const result = await db.query(
			`UPDATE conversations SET conversation = $1 WHERE id = $2 RETURNING id, subject, conversation`,
			[conversation, id]
		);
		return result.rows[0];
	},
};
