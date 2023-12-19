import Link from 'next/link';
import Image from 'next/image';

import userRegular from '../../../public/user-regular.svg';

export default function Settings() {
  return (
    <>
      <h1>Settings</h1>
      <Link
        href='/api/auth/signout'
        className='flex h-10 w-64 items-center justify-center gap-2 rounded-lg bg-blue-900 p-2 font-semibold hover:bg-blue-800'
      >
        <Image src={userRegular} alt='My-GPT Logo' width={15} />
        <p className='text-sm'>Sign out</p>
      </Link>
    </>
  );
}
