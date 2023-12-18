export const metadata = {
  title: 'Chat',
};

import ChatInput from '@/components/chatInput';

export default function Chat() {
  return (
    <>
      <section className='flex h-full items-center justify-center'>
        <h1 className='text-3xl font-bold'>Chat</h1>
      </section>
      <ChatInput />
    </>
  );
}
