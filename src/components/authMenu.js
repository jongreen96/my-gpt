import { auth } from '@/auth';
import Link from 'next/link';
import Image from 'next/image';

import userSolid from '../../public/user-solid.svg';

export default async function AuthMenu() {
  const session = await auth();

  if (!session)
    return (
      <section className='hidden flex-col gap-2 group-hover:flex sm:flex'>
        <Link
          href='/api/auth/signin'
          className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-900 p-2 font-semibold hover:bg-blue-800'
        >
          <Image src={userSolid} alt='My-GPT Logo' width={15} />
          <p className='hidden text-sm group-hover:block'>Sign in</p>
        </Link>
      </section>
    );
}
