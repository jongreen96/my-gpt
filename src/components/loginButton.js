'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function LoginButton({ provider }) {
  return (
    <button
      onClick={() => signIn(provider.id, { callbackUrl: '/' })}
      className='flex items-center gap-2 rounded-md bg-gray-200 p-2 hover:bg-gray-300'
    >
      <Image src={provider.icon} alt={provider.name} width={20} height={20} />
      <span>{provider.name}</span>
    </button>
  );
}
