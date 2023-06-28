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

export const generateResponse = async (conversation) => {
	const response = await Api.post('/conversations', {
		messages: conversation,
	});

	return response.data;
};
