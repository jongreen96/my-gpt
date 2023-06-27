import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveConversation } from '../../store/conversations/conversationsSlice';

export default function Conversations({}) {
	const dispatch = useDispatch();
	const { status, conversations } = useSelector((state) => state.conversations);

	if (status === 'loading') return <div>Loading...</div>;
	if (status === 'failed') return <div>Error</div>;

	return (
		<ul role='list' className='flex w-full flex-col gap-2 align-middle'>
			{/* Loop through conversations */}
			<Link
				to='/chat'
				onClick={() => {
					dispatch(setActiveConversation(null));
				}}
			>
				<li className='w-full items-center rounded-lg rounded-br-none bg-teal-700 p-2 hover:bg-teal-800'>
					<span className='text-m text-white'>New Chat</span>
				</li>
			</Link>
			{conversations.map((conversation) => (
				<Link
					to={`/chat/${conversation.id}`}
					key={conversation.id}
					onClick={() => {
						dispatch(setActiveConversation(conversation.id));
					}}
				>
					<li className='w-full items-center rounded-lg rounded-br-none bg-teal-700 p-2 hover:bg-teal-800'>
						<span className='text-m text-white'>{conversation.subject}</span>
					</li>
				</Link>
			))}
		</ul>
	);
}
