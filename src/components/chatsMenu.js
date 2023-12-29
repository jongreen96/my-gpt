import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';

import chatSolid from '@/../public/message-solid.svg';

export default async function ChatsMenu() {
  const session = await auth();
  if (!session) return null;

  const chats = await fetch(`${process.env.BASE_URL}/api/chats`, {
    headers: {
      Authorization: session.user.id,
    },
  });
  const chatsJson = await chats.json();

  return (
    <>
      <Link
        href='/chat'
        className='hidden h-10 w-full items-center gap-2 rounded-lg bg-blue-900 px-[9px] hover:bg-blue-800 group-hover:flex sm:flex'
      >
        <Image src={chatSolid} alt='My-GPT Logo' width={20} />
        <p className='hidden font-semibold group-hover:block'>New Chat</p>
      </Link>

      {chatsJson.map((chat) => (
        <Link
          href={`/chat/${chat.id}`}
          key={chat.id}
          className='hidden h-10 w-full items-center gap-2 rounded-lg bg-gray-300 px-[9px] hover:bg-gray-250 group-hover:flex sm:flex'
        >
          <Image src={chatSolid} alt='My-GPT Logo' width={20} />
          <p className='hidden font-semibold group-hover:block'>
            {chat.subject}
          </p>
        </Link>
      ))}
    </>
  );
}
