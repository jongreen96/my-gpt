const db = require('../db');

module.exports = {
	getAllConversations: async (userId) => {
		const result = await db.query(
			'SELECT id, subject, conversation FROM conversations WHERE admin_id = $1 OR user_id = $1',
			[userId]
		);
		return result.rows;
	},
	updateConversation: async (id, conversation) => {
		const stringifiedConversation = JSON.stringify(conversation);
		const result = await db.query(
			`UPDATE conversations SET conversation = $1 WHERE id = $2 RETURNING id, subject, conversation`,
			[stringifiedConversation, id]
		);
		return result.rows[0];
	},
	createConversation: async (conversation, userId) => {
		const subject =
			conversation[0].content.length > 20
				? conversation[0].content.slice(0, 20) + '...'
				: conversation[0].content;
		const stringifiedConversation = JSON.stringify(conversation);
		const result = await db.query(
			`INSERT INTO conversations (admin_id, subject, conversation) VALUES ($1, $2, $3) RETURNING id, subject, conversation`,
			[userId, subject, stringifiedConversation]
		);
		return result.rows[0];
	},
	deleteConversation: async (id) => {
		const result = await db.query(
			`DELETE FROM conversations WHERE id = $1 RETURNING id`,
			[id]
		);
		return result.rows[0];
	},
};
