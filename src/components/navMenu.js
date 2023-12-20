import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';

import expandArrow from '../../public/expand-arrow.svg';
import settingsIcon from '../../public/settings.svg';

export async function MobileNavMenu() {
  const session = await auth();

  return (
    <section className='flex min-w-[88px] justify-end gap-2'>
      <Image
        src={expandArrow}
        alt='Expand Arrow'
        width={40}
        height={40}
        className='rotate-90 group-hover:hidden sm:hidden'
      />

      {session && (
        <Link
          href='/settings'
          className='flex aspect-square h-full items-center justify-center gap-2 self-end rounded-lg bg-gray-300 hover:bg-gray-250 sm:hidden'
        >
          <Image src={settingsIcon} alt='settings' width={20} height={20} />
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
          href='/settings'
          className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gray-300 p-2 font-semibold hover:bg-gray-250'
        >
          <Image src={settingsIcon} alt='settings' width={20} height={20} />
          <p className='hidden text-sm font-semibold group-hover:block'>
            Settings
          </p>
        </Link>
      )}
    </section>
  );
}
