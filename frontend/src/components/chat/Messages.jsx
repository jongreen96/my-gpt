import React, { useRef } from 'react';
import { scrollToBottom, setChatMargin } from '../../utils/ChatUtils';

export const Messages = ({ conversation }) => {
	const chatRef = useRef(null);

	scrollToBottom(chatRef, conversation);
	setChatMargin();

	return (
		<section className='flex grow flex-col justify-end gap-2 p-2'>
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
