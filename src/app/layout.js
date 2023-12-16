import { Inter } from 'next/font/google';
import Image from 'next/image';
import logo from '../../public/openai.svg';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
			<body className={`${inter.className} h-svh bg-gray-100`}>
				<nav className='w-full fixed left-0 bg-gray-200 border-b-2 border-gray-300'>
					<div className='flex items-center gap-2 p-1'>
						<Image src={logo} alt='My-GPT Logo' width={40} height={40} />
						<p className='text-3xl font-semibold whitespace-nowrap'>My-GPT</p>
					</div>
				</nav>
				<main>{children}</main>
			</body>
		</html>
	);
}
