import { useEffect } from 'react';
import { updateConversation } from '../store/conversations/conversationsAPI';
import Api from './Api';

// Scroll to bottom of chat on new activity
export const scrollToBottom = (chatRef, conversation) => {
	const scrollToBottom = () => {
		chatRef.current?.scrollIntoView();
	};

	useEffect(() => {
		scrollToBottom();
	}, [conversation]);
};

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

	const newConversation = conversation.conversation
		? conversation.conversation.concat({
				role: 'user',
				content: userInput,
		  })
		: [
				{
					role: 'user',
					content: userInput,
				},
		  ];

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
