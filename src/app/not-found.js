import Image from 'next/image';
import Link from 'next/link';

import dogFalling from '../../public/dog-falling.gif';

export default function NotFound() {
  return (
    <section className='flex h-full flex-col items-center justify-center gap-5'>
      <Image src={dogFalling} alt='Dog Falling' width={200} priority />
      <h1 className='text-3xl font-bold'>404 - Not Found</h1>
      <p className='text-center text-sm'>
        The page you are looking for does not exist.
        <br />
        Please check the URL or go back to the homepage.
      </p>

      <Link
        href='/'
        className='flex h-10 w-fit items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-gray-300 p-2 font-semibold hover:border-gray-400'
      >
        Home Page
      </Link>
    </section>
  );
}
