export const metadata = {
  title: 'Chat',
};

import ChatInput from '@/components/chatInput';

export default function ChatLayout({ children }) {
  return (
    <>
      <section className='flex h-full w-full flex-col justify-end p-2'>
        {children}
      </section>
      <ChatInput />
    </>
  );
}
