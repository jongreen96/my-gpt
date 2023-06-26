import { useEffect } from 'react';
import Api from './Api';

// add margin to bottom of chat to prevent input from covering last message
export const setChatMargin = () => {
	useEffect(() => {
		const chat = document.querySelector('section');
		chat.style.marginBottom = `${
			document.querySelector('form').offsetHeight
		}px`;
	}, []);
};

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
	const response = await Api.post('/chat', {
		messages: conversation,
	});

	return response.data;
};
