const express = require('express');
const generateResponse = require('../utils/openAi');
const router = express.Router();

router.post('/', async (req, res) => {
	const { messages } = req.body;
	const result = await generateResponse(messages);
	res.send(result);
});

module.exports = router;
