import { useSelector } from 'react-redux';
import { ChatInput } from '../components/chat/ChatInput';
import { Messages } from '../components/chat/Messages';

export default function Chat({}) {
	const { status, conversations, activeConversation } = useSelector(
		(state) => state.conversations
	);

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
