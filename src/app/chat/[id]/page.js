import Chat from '@/components/chat';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

export default async function ChatPage({ params }) {
  const initialMessages = await getInitialMessages(params.id);
  if (!initialMessages.length) redirect('/chat');

  return <Chat initialMessages={initialMessages} />;
}

async function getInitialMessages(id) {
  const messages = await sql`
    SELECT * FROM messages
    WHERE conversation_id = ${id}
  `;
  return messages.rows;
}
