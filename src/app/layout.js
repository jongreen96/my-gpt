import './globals.css';
import { Roboto_Flex } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

import expandArrow from '../../public/expand-arrow.svg';
import logo from '../../public/openai.svg';

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
      <body className={`${roboto.className}Rh-svh bg-gray-100`}>
        <nav className='group fixed left-0 max-h-[75svh] w-full border-b-2 border-gray-300 bg-gray-200'>
          <div className='flex justify-between p-2'>
            <Link href='/' className='flex items-center gap-2'>
              <Image src={logo} alt='My-GPT Logo' width={40} height={40} />
              <p className='-mt-1 whitespace-nowrap text-4xl font-semibold'>
                My-GPT
              </p>
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

          <section></section>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
