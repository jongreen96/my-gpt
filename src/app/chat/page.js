import Chat from '@/components/chat';
import { auth } from '@/auth';
import { nanoid } from 'nanoid';

export default async function NewChat() {
  const { user } = await auth();

  return <Chat userId={user.id} id={nanoid(10)} />;
}
