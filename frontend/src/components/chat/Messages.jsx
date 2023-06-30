import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';

export const Messages = ({ conversations, activeConversation }) => {
	const chatRef = useRef(null);

	const conversation = useMemo(() => {
		return (
			conversations.find(
				(conversation) => conversation.id === activeConversation
			)?.conversation || []
		);
	}, [conversations, activeConversation]);

	// Scroll to bottom of chat on new message
	useEffect(() => {
		chatRef.current?.scrollIntoView();
	}, [conversation]);

	return (
		<section className='mb-14 flex grow flex-col justify-end gap-2 p-2'>
			{conversation.map((message, i) => {
				return message.role === 'user' ? (
					<p
						key={i}
						className='w-fit max-w-[90%] self-end rounded-lg rounded-br-none bg-blue p-2 text-white'
					>
						{message.content}
					</p>
				) : (
					<p
						key={i}
						className='w-fit max-w-[90%] whitespace-normal rounded-lg rounded-bl-none bg-teal-700 p-2 text-white'
					>
						{message.content}
					</p>
				);
			})}
			<div ref={chatRef} className='-m-2' aria-hidden='true' />
		</section>
	);
};

Messages.propTypes = {
	conversations: PropTypes.array.isRequired,
	activeConversation: PropTypes.number,
};
