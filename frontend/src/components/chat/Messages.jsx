import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef } from 'react';
import { Thinking } from './Thinking';
import { ChatBubble } from './ChatBubble';

export const Messages = ({ conversations, activeConversation }) => {
	const chatRef = useRef(null);

	// Get active conversation
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
				return (
					<ChatBubble message={message} key={i} i={conversation.length - i} />
				);
			})}

			{conversation[conversation.length - 1]?.role === 'user' && <Thinking />}

			<div ref={chatRef} className='-m-2' aria-hidden='true' />
		</section>
	);
};

Messages.propTypes = {
	conversations: PropTypes.array.isRequired,
	activeConversation: PropTypes.number,
};
