import './globals.css';
import { Roboto_Flex } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

import logo from '../../public/openai.svg';
import expandArrow from '../../public/expand-arrow.svg';
import userSolid from '../../public/user-solid.svg';
import userRegular from '../../public/user-regular.svg';

const roboto = Roboto_Flex();

export const metadata = {
  title: {
    template: 'My-GPT | %s',
    default: 'My-GPT | Home',
  },
  description:
    'Developed with the goal of enabling individuals to harness powerful features like GPT-4 without the commitment of a fixed monthly fee, My-GPT provides a pay-as-you-go approach to OpenAI usage.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body
        className={`${roboto.className} flex h-svh justify-center bg-gray-100`}
      >
        <nav className='group fixed left-0 flex h-14 max-h-[75svh] w-full flex-col gap-4 overflow-hidden border-b-2 border-gray-300 bg-gray-200 p-2 hover:h-fit sm:h-full sm:max-h-none sm:w-14 sm:border-b-0 sm:border-r-2 sm:hover:h-full sm:hover:w-fit'>
          <div className='flex justify-between'>
            <Link href='/' className='flex items-center gap-2'>
              <Image src={logo} alt='My-GPT Logo' width={40} height={40} />
              <p className='whitespace-nowrap text-4xl font-semibold'>My-GPT</p>
            </Link>

            <section className='flex items-center gap-2'>
              <Image
                src={expandArrow}
                alt='Expand Arrow'
                width={40}
                height={40}
                className='rotate-90 group-hover:hidden'
              />

              {/* Settings button depending on user */}
            </section>
          </div>

          <section className='flex flex-col gap-2'>
            <Link
              href='/sign-in'
              className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-900 p-2 font-semibold hover:bg-blue-800'
            >
              <Image src={userSolid} alt='My-GPT Logo' width={15} />
              <p className='hidden text-sm group-hover:block'>Sign in</p>
            </Link>

            <Link
              href='/sign-up'
              className='hover:bg-gray-250 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gray-300 p-2 font-semibold'
            >
              <Image src={userRegular} alt='My-GPT Logo' width={15} />
              <p className='hidden text-sm group-hover:block'>Sign up</p>
            </Link>
          </section>

          <section className='bottom-2 mt-auto hidden items-center gap-2 sm:flex'>
            <Image
              src={expandArrow}
              alt='Expand Arrow'
              width={40}
              height={40}
              className='group-hover:hidden'
            />

            {/* Settings button depending on user */}
          </section>
        </nav>

        <main className='flex h-full w-full max-w-5xl flex-col pt-14 sm:pl-14 sm:pt-0'>
          {children}
        </main>
      </body>
    </html>
  );
}
