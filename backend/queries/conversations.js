const db = require('../db');

module.exports = {
	getAllConversations: async () => {
		const result = await db.query(
			'SELECT id, subject, conversation FROM conversations'
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
	createConversation: async (conversation) => {
		const subject =
			conversation[0].content.length > 20
				? conversation[0].content.slice(0, 20) + '...'
				: conversation[0].content;
		const stringifiedConversation = JSON.stringify(conversation);
		const result = await db.query(
			`INSERT INTO conversations (subject, conversation) VALUES ($1, $2) RETURNING id, subject, conversation`,
			[subject, stringifiedConversation]
		);
		return result.rows[0];
	},
};
