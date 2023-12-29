import './globals.css';
import { Roboto_Flex } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

import { MobileNavMenu, NavMenu } from '@/components/navMenu';
import AuthMenu from '@/components/authMenu';
import ChatsMenu from '@/components/chatsMenu';
import logo from '@/../public/openai.svg';

const roboto = Roboto_Flex({ subsets: ['latin'] });

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
        <nav className='group fixed left-0 flex max-h-[75svh] w-full flex-col gap-4 overflow-hidden border-b-2 border-gray-300 bg-gray-200 p-2 hover:h-fit sm:h-full sm:max-h-none sm:w-14 sm:border-b-0 sm:border-r-2 sm:hover:h-full sm:hover:w-fit'>
          <div className='flex justify-between'>
            <Link href='/' className='flex items-center gap-2'>
              <Image src={logo} alt='My-GPT Logo' width={40} height={40} />
              <p className='whitespace-nowrap text-4xl font-semibold'>My-GPT</p>
            </Link>

            <MobileNavMenu />
          </div>

          <AuthMenu />
          <ChatsMenu />

          <NavMenu />
        </nav>

        <main className='flex h-full w-full max-w-5xl flex-col pt-14 sm:pl-14 sm:pt-0'>
          {children}
        </main>
      </body>
    </html>
  );
}
