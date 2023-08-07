const express = require('express');
const generateResponse = require('../utils/openAi');
const {
	getAllConversations,
	updateConversation,
	createConversation,
	deleteConversation,
} = require('../queries/conversations');
const { calculateTokens } = require('../queries/users');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const conversations = await getAllConversations(req.user.id);
		res.send(conversations);
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.put('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { conversation } = req.body;
		const result = await updateConversation(id, conversation);
		res.send(result);
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.post('/', async (req, res) => {
	try {
		const { messages } = req.body;
		const strippedMessages = messages.map((message) => {
			return {
				role: message.role,
				content: message.content,
			};
		});
		const result = await generateResponse(strippedMessages);
		await calculateTokens(req.user.id, result.usage.total_tokens);
		res.send({
			...result.choices[0].message,
			usage: result.usage,
			time: new Date().toISOString(),
		});
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.post('/new', async (req, res) => {
	try {
		const { conversation } = req.body;
		const result = await createConversation(conversation, req.user.id);
		res.send(result);
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await deleteConversation(id);
		res.send(result);
	} catch (error) {
		res.status(500).send('Server error');
	}
});

module.exports = router;
