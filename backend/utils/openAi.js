const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateResponse = async (messages) => {
	const response = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages,
	});
	return response.data;
};

module.exports = generateResponse;
