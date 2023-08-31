const express = require('express');
const generateResponse = require('../utils/openAi');
const {
	getAllConversations,
	updateConversation,
	createConversation,
	deleteConversation,
} = require('../queries/conversations');
const { calculateUsage } = require('../queries/users');
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
		const { messages, apiKey } = req.body;
		const strippedMessages = messages.map((message) => {
			return {
				role: message.role,
				content: message.content,
			};
		});
		const result = await generateResponse(strippedMessages, apiKey);

		await calculateUsage(req.user.id, result.usage.total_tokens);

		console.log(result.choices[0].message);
		res.send({
			...result.choices[0].message,
			usage: result.usage,
			time: new Date().toISOString(),
		});
	} catch (error) {
		const errorMessage = {
			role: 'assistant',
			content: 'Invalid API key! Please update it in the settings menu.',
		};
		res.send({
			...errorMessage,
			usage: {
				total_tokens: 0,
			},
			time: new Date().toISOString(),
		});
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
