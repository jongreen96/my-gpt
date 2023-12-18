import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import ChatInput from '@/components/chatInput';

export const metadata = {
  title: 'Chat',
};

export default async function ChatLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return (
    <>
      <section className='flex h-full w-full flex-col justify-end p-2'>
        {children}
      </section>
      <ChatInput />
    </>
  );
}
