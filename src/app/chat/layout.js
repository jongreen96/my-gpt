import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Chat',
};

export default async function ChatLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  return <>{children}</>;
}
