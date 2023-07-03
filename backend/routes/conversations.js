const express = require('express');
const generateResponse = require('../utils/openAi');
const {
	getAllConversations,
	updateConversation,
	createConversation,
	deleteConversation,
} = require('../queries/conversations');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const conversations = await getAllConversations();
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
		const result = await generateResponse(messages);
		res.send(result);
	} catch (error) {
		res.status(500).send('Server error');
	}
});

router.post('/new', async (req, res) => {
	try {
		const { conversation } = req.body;
		const result = await createConversation(conversation);
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
