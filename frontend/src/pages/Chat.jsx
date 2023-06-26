import { useState } from 'react';
import { ChatInput } from '../components/chat/ChatInput';
import { Messages } from '../components/chat/Messages';

export default function Chat({}) {
	const [conversation, setConversation] = useState([]);
	return (
		<main className='mx-auto flex w-full max-w-3xl grow flex-col'>
			<Messages conversation={conversation} />
			<ChatInput
				conversation={conversation}
				setConversation={setConversation}
			/>
		</main>
	);
}
