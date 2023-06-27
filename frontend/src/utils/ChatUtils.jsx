import { useEffect } from 'react';
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

export const generateResponse = async (newMessage, conversation) => {
	const response = await Api.post('/conversations', {
		messages: [...conversation, newMessage],
	});

	return response.data;
};
