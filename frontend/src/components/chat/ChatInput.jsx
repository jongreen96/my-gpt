import React, { useState } from 'react';
import Icons from '../../assets/Icons';
import { generateResponse } from '../../utils/ChatUtils';
import { useDispatch } from 'react-redux';

export const ChatInput = ({ conversations, activeConversation }) => {
	const dispatch = useDispatch();
	const [userInput, setUserInput] = useState('');

	const conversation = conversations.find(
		(conversation) => conversation.id === activeConversation
	);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (userInput === '') return;

		const newMessage = {
			role: 'user',
			content: userInput,
		};

		const response = await generateResponse(
			newMessage,
			conversation.conversation
		);

		// TODO: Currently works up to here but need to dispatch the response to the store
		//       and show the response in the chat along with updating the database
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='fixed bottom-0 flex w-full max-w-3xl p-2 backdrop-blur-sm md:w-[calc(100%-200px)]'
		>
			<input
				type='text'
				className='h-10 w-full rounded-lg rounded-r-none border-2 border-teal-700 bg-light p-2 outline-none dark:bg-xdark'
				placeholder='Type your message here...'
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
			/>

			<button type='submit' className='h-10 w-10 rounded-tr-lg bg-teal-700'>
				<Icons.GptLogoSmall />
			</button>
		</form>
	);
};
