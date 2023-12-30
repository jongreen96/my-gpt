import Chat from '@/components/chat';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function ChatPage({ params }) {
  const { user } = await auth();
  const initialMessages = await getInitialMessages(params.id);
  if (!initialMessages.length) redirect('/chat');

  return (
    <Chat initialMessages={initialMessages} id={params.id} userId={user.id} />
  );
}

async function getInitialMessages(id) {
  const messages = await sql`
    SELECT * FROM messages
    WHERE conversation_id = ${id}
  `;
  return messages.rows;
}
