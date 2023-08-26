const { Configuration, OpenAIApi } = require('openai');

const generateResponse = async (messages, apiKey, model = 'gpt-3.5-turbo') => {
	const configuration = new Configuration({
		apiKey: apiKey,
	});
	const openai = new OpenAIApi(configuration);

	const response = await openai.createChatCompletion({
		messages,
		model,
	});
	return response.data;
};

module.exports = generateResponse;
