import React from 'react';
import { Link } from 'react-router-dom';

export default function Conversations({}) {
	return (
		<ul role='list' className='flex w-full flex-col gap-2 align-middle'>
			{/* Loop through conversations */}
			<Link to='/chat'>
				<li className='w-full items-center rounded-lg rounded-br-none bg-teal-700 p-2 hover:bg-teal-800'>
					<span className='text-m text-white'>New Chat</span>
				</li>
			</Link>
			{/* {conversations.map((conversation) => (
				<Link
					to={`/chat/${conversation.id}`}
					key={conversation.id}
					onClick={() => setActiveChat(conversation.id)}
				>
					<li className='w-full items-center rounded-lg rounded-br-none bg-teal-700 p-2 hover:bg-teal-800'>
						<span className='text-m text-white'>{conversation.subject}</span>
					</li>
				</Link>
			))} */}
		</ul>
	);
}
