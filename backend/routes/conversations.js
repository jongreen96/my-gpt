const express = require('express');
const generateResponse = require('../utils/openAi');
const { getAllConversations } = require('../queries/conversations');
const router = express.Router();

router.post('/', async (req, res) => {
	try {
		const { messages } = req.body;
		const result = await generateResponse(messages);
		res.send(result);
	} catch (error) {
		res.status(500).send('Server error');
	}
});

// Test route to retrieve all conversations for a user
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const conversations = await getAllConversations(id);
		res.send(conversations);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server error');
	}
});

module.exports = router;
