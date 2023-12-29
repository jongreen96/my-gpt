'use client';

import { useChat } from 'ai/react';
import ChatInput from './chatInput';

export default function Chat({ initialMessages }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages,
  });

  return (
    <>
      <section className='flex h-full w-full flex-col justify-end gap-2 p-2'>
        {messages &&
          messages.map((message) =>
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
