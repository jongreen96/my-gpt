import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<main className='mx-auto flex w-full max-w-3xl flex-col gap-10 p-2 pt-10'>
			<h1 className='text-4xl font-semibold uppercase'>gpt made simple</h1>

			<div className='flex flex-col gap-2'>
				<p className='text-lg'>
					My-GPT is a free website that allows users to leverage their personal
					OpenAI API keys for seamless interaction with OpenAI's API. Developed
					with the goal of enabling individuals to harness powerful features
					like GPT-4 without the commitment of a fixed monthly fee, My-GPT
					provides a pay-as-you-go approach to OpenAI usage.
				</p>
				<Link
					to='/register'
					role='button'
					className='mt-auto w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-center text-xl font-semibold uppercase text-white hover:bg-teal-800'
				>
					join my-gpt
				</Link>
				<p className='text-sm'>
					No payment details are required and we dont charge you anything, you
					only pay for what you use with OpenAI.
				</p>
			</div>

			<div className='flex flex-col gap-2'>
				<h2 className='text-2xl font-semibold uppercase'>how much it costs</h2>
				<p className='text-lg'>
					We dont charge you anything, you only pay for what you use with
					OpenAI. You can view their pricing here:
				</p>
				<a href='https://openai.com/pricing' target='_blank' rel='noreferrer'>
					<button className='w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-center text-xl font-semibold uppercase text-white hover:bg-teal-800'>
						view openai pricing
					</button>
				</a>
			</div>

			<div className='flex flex-col gap-2'>
				<h2 className='text-2xl font-semibold uppercase'>Getting Started</h2>
				<p className='text-lg'>
					To get started with My-GPT, follow these steps:
				</p>
				<ol className='list-inside list-decimal'>
					<li>
						Sign up or log in to your OpenAI account at{' '}
						<a
							href='https://platform.openai.com/'
							target='_blank'
							rel='noreferrer'
							className='font-bold text-teal-700 underline hover:text-teal-800'
						>
							OpenAI
						</a>
						.
					</li>
					<li>
						Navigate to the API settings or dashboard to obtain your{' '}
						<a
							href='https://platform.openai.com/account/api-keys'
							target='_blank'
							rel='noreferrer'
							className='font-bold text-teal-700 underline hover:text-teal-800'
						>
							OpenAI API key.
						</a>
					</li>
					<li>
						Input your API Key when registering for an account (or on the
						settings page when logging in from a new device).
					</li>
				</ol>
			</div>
		</main>
	);
}
