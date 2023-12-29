import ChatComp from '@/components/chat';
import { redirect } from 'next/navigation';

export default async function Chat({ params }) {
  let initialMessages = [];

  if (params.id) {
    const response = await fetch(
      `${process.env.BASE_URL}/api/chats/${params.id}`,
      { cache: 'no-store' },
    );

    const json = await response.json();

    if (!json.length) {
      redirect('/chat');
    } else {
      initialMessages = json;
    }
  }

  return <ChatComp initialMessages={initialMessages} />;
}
