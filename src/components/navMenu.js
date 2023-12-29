import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';

import expandArrow from '@/../public/expand-arrow.svg';
import userSolid from '@/../public/user-solid.svg';

export async function MobileNavMenu() {
  const session = await auth();

  return (
    <section className='flex min-w-[88px] justify-end gap-2 sm:hidden'>
      <Image
        src={expandArrow}
        alt='Expand Arrow'
        width={40}
        height={40}
        className='rotate-90 group-hover:hidden'
      />

      {session && (
        <Link
          href='/account'
          className='flex aspect-square h-full items-center self-end'
        >
          {session.user.image ? (
            <>
              <Image
                src={session.user.image}
                alt='User Profile'
                width={38}
                height={38}
                className='fixed rounded-full'
              />
            </>
          ) : (
            <>
              <Image
                src={userSolid}
                alt='account'
                width={38}
                height={38}
                className='fixed p-2'
              />
            </>
          )}
        </Link>
      )}
    </section>
  );
}

export async function NavMenu() {
  const session = await auth();

  return (
    <section className='bottom-2 mt-auto hidden flex-col items-center gap-2 sm:flex'>
      <Image
        src={expandArrow}
        alt='Expand Arrow'
        width={40}
        height={40}
        className='group-hover:hidden'
      />

      {session && (
        <Link
          href='/account'
          className='flex h-10 w-full items-center gap-2 overflow-hidden rounded-3xl group-hover:rounded-r-lg group-hover:bg-gray-300 group-hover:hover:bg-gray-250'
        >
          {session.user.image ? (
            <>
              <Image
                src={session.user.image}
                alt='User Profile'
                width={38}
                height={38}
                className='fixed rounded-full'
              />
              <p className='mx-auto hidden font-semibold group-hover:block'>
                Account
              </p>
            </>
          ) : (
            <>
              <Image
                src={userSolid}
                alt='account'
                width={38}
                height={38}
                className='fixed p-2'
              />
              <p className='mx-auto hidden font-semibold group-hover:block'>
                Account
              </p>
            </>
          )}
        </Link>
      )}
    </section>
  );
}
