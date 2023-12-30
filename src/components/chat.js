'use client';

import { useChat } from 'ai/react';
import ChatInput from './chatInput';
import { useRouter, usePathname } from 'next/navigation';

export default function Chat({ initialMessages, id, userId }) {
  const router = useRouter();
  const pathname = usePathname();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
    body: {
      id,
      userId,
    },
    onFinish: () => {
      if (pathname !== `/chat/${id}`) router.push(`/chat/${id}`);
    },
  });

  return (
    <>
      <section className='no-scrollbar flex w-full flex-grow flex-col gap-2 overflow-scroll p-2'>
        {messages.map((message) =>
          message.role === 'user' ? (
            <div
              key={message.id}
              className='flex w-fit flex-col self-end rounded-lg rounded-br-none bg-blue-1000 p-2'
            >
              <span className='text-white'>{message.content}</span>
            </div>
          ) : (
            <div
              key={message.id}
              className='flex w-fit flex-col rounded-lg rounded-bl-none bg-gray-200 p-2'
            >
              <span className='whitespace-pre-wrap text-white'>
                {message.content}
              </span>
            </div>
          ),
        )}
      </section>
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
