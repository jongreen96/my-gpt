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
	dispatch
) => {
	if (userInput === '') return;
	setUserInput('');

	const newConversation = conversation.conversation.concat({
		role: 'user',
		content: userInput,
	});

	dispatch(
		updateConversation({
			...conversation,
			conversation: [...newConversation],
		})
	);

	const response = await generateResponse(newConversation);

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
