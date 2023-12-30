import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { sql } from '@vercel/postgres';

import chatSolid from '@/../public/message-solid.svg';

export default async function ChatsMenu() {
  const session = await auth();
  if (!session) return null;

  const conversations = await getConversations(session.user.id);

  return (
    <div className='hidden flex-col gap-1 group-hover:flex'>
      <Link
        href='/chat'
        className='hidden h-10 w-full items-center gap-2 rounded-lg bg-blue-900 px-[9px] hover:bg-blue-800 group-hover:flex sm:flex'
      >
        <Image src={chatSolid} alt='My-GPT Logo' width={20} />
        <p className='hidden font-semibold group-hover:block'>New Chat</p>
      </Link>

      {conversations.map((chat) => (
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
    </div>
  );
}

async function getConversations(id) {
  const conversations = await sql`
    SELECT * FROM conversations
    WHERE user_id = ${id}
  `;
  return conversations.rows;
}
