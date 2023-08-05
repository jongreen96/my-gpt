import {
	createConversation,
	updateConversation,
} from '../store/conversations/conversationsAPI';
import { setActiveConversation } from '../store/conversations/conversationsSlice';
import Api from './Api';

export const generateResponse = async (conversation) => {
	const response = await Api.post('/conversations', {
		messages: conversation,
	});

	return response.data;
};

export const handleChatInput = async (
	userInput,
	setUserInput,
	conversation,
	dispatch,
	settings
) => {
	if (userInput === '') return;
	setUserInput('');

	const newConversation = conversation.conversation.concat({
		role: 'user',
		content: userInput,
		time: new Date().toISOString(),
	});

	dispatch(
		updateConversation({
			...conversation,
			conversation: [...newConversation],
		})
	);

	// send messages based on settings.conversation_memory_length
	const memoryLength =
		settings.conversation_memory_length === 0
			? 1000
			: settings.conversation_memory_length * 2 - 1;

	const response = await generateResponse(newConversation.slice(-memoryLength));

	dispatch(
		updateConversation({
			...conversation,
			conversation: [...newConversation, response],
		})
	);
};

export const handleNewChat = async (userInput, setUserInput, dispatch) => {
	if (userInput === '') return;
	setUserInput('');

	const newConversation = [
		{
			role: 'user',
			content: userInput,
			time: new Date().toISOString(),
		},
	];

	const newlyCreatedConversation = await dispatch(
		createConversation({
			conversation: [...newConversation],
		})
	);

	await dispatch(setActiveConversation(newlyCreatedConversation.payload.id));

	const response = await generateResponse(newConversation);

	dispatch(
		updateConversation({
			...newlyCreatedConversation.payload,
			conversation: [...newConversation, response],
		})
	);
};
