import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveConversation } from '../../store/conversations/conversationsSlice';
import { deleteConversation } from '../../store/conversations/conversationsAPI';
import Icons from '../../assets/Icons';

export default function Conversations() {
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
					to={`/chat`}
					key={conversation.id}
					onClick={() => {
						dispatch(setActiveConversation(conversation.id));
					}}
				>
					<li className='flex w-full items-center justify-between rounded-lg rounded-br-none bg-teal-700 p-2 hover:bg-teal-800'>
						<span className='text-m text-white'>{conversation.subject}</span>
						<button
							onClick={() => {
								dispatch(deleteConversation(conversation.id));
							}}
						>
							<Icons.DeleteButton />
						</button>
					</li>
				</Link>
			))}
		</ul>
	);
}
