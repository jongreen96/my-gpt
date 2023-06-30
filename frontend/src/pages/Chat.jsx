import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ChatInput } from '../components/chat/ChatInput';
import { Messages } from '../components/chat/Messages';
import { setActiveConversation } from '../store/conversations/conversationsSlice';

export default function Chat() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { status, conversations, activeConversation } = useSelector(
		(state) => state.conversations
	);

	useEffect(() => {
		dispatch(setActiveConversation(Number(id)));
	}, [id, dispatch]);

	if (status === 'loading') return <div>Loading...</div>;
	if (status === 'failed') return <div>Error</div>;

	return (
		<main className='mx-auto flex w-full max-w-3xl grow flex-col'>
			<Messages
				conversations={conversations}
				activeConversation={activeConversation}
			/>
			<ChatInput
				conversations={conversations}
				activeConversation={activeConversation}
			/>
		</main>
	);
}
