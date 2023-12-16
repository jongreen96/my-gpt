import { Inter } from 'next/font/google';
import Image from 'next/image';
import logo from '../../public/openai.png';
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
				<nav className='group fixed left-0 flex h-14 w-full flex-col overflow-hidden border-b-2 border-gray-300 bg-gray-200 hover:h-auto hover:max-h-[75vh] sm:h-full sm:w-16 sm:border-b-0 sm:border-r-2 sm:hover:h-full sm:hover:max-h-screen sm:hover:w-64'>
					<div className='flex items-center justify-between pr-2'>
						<div className='relative w-12 h-12'>
							<Image src={logo} alt='My-GPT Logo' />
						</div>
					</div>
				</nav>
				{children}
			</body>
		</html>
	);
}
