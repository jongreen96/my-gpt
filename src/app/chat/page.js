import { auth } from '@/auth';

export default async function Chat() {
  const session = await auth();
  return (
    <pre className='w-full overflow-hidden'>
      {JSON.stringify(session, null, 2)}
    </pre>
  );
}
