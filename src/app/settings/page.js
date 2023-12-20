'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';

import userRegular from '../../../public/user-regular.svg';

export default function Settings() {
  return (
    <div className='flex h-full flex-col items-center justify-center p-2'>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className='flex h-10 w-64 items-center justify-center gap-2 rounded-lg bg-blue-900 p-2 font-semibold hover:bg-blue-800'
      >
        <Image src={userRegular} alt='My-GPT Logo' width={15} />
        <p className='text-sm'>Sign out</p>
      </button>
    </div>
  );
}
