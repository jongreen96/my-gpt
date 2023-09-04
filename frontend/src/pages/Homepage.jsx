import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<main className='mx-auto my-10 flex max-w-5xl flex-col gap-20 p-2'>
			<section className='flex w-full flex-col gap-6 lg:flex-row'>
				<div className='flex flex-col justify-center gap-4 lg:w-1/2'>
					<h1 className='text-6xl font-bold'>My-GPT</h1>
					<p>
						My-GPT is a free website that allows users to leverage their
						personal OpenAI API keys for seamless interaction with OpenAI's API.
						Developed with the goal of enabling individuals to harness powerful
						features like GPT-4 without the commitment of a fixed monthly fee,
						My-GPT provides a pay-as-you-go approach to OpenAI usage.
					</p>
					<div>
						<Link
							to='/register'
							role='button'
							className='block w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-center text-xl font-semibold uppercase text-white hover:bg-teal-800'
						>
							join my-gpt
						</Link>
						<p className='text-xs'>
							No payment details are required and we dont charge you anything,
							you only pay for what you use with OpenAI.
						</p>
					</div>
				</div>
				<img
					src='https://images.pexels.com/photos/16037283/pexels-photo-16037283/free-photo-of-open-laptop-on-desk.jpeg'
					alt='still image of my-gpt chat screen'
					className='rounded-lg object-cover lg:w-1/2'
				/>
			</section>

			<section className='flex flex-col gap-10 lg:flex-row'>
				<div className='flex w-full flex-col gap-4'>
					<h2 className='text-4xl font-semibold uppercase'>how it works</h2>
					<p>
						Simply sign up for an account and input your OpenAI API key. You can
						then use My-GPT to interact with and track your usage of OpenAI's
						API. We dont charge you anything, you only pay for what you use with
						OpenAI directly. You can view their pricing{' '}
						<a
							href='https://openai.com/pricing'
							target='_blank'
							rel='noreferrer'
							className='font-bold text-teal-700 hover:text-teal-800'
						>
							here
						</a>
						.
					</p>
					<div>
						<h3 className='text-2xl font-semibold uppercase'>
							Getting started
						</h3>
						<p>
							To get started with My-GPT, follow these 3 simple steps:
							<ol className='mt-4 list-inside list-decimal'>
								<li>
									Sign up or log in to your OpenAI account at{' '}
									<a
										href='https://platform.openai.com/'
										target='_blank'
										rel='noreferrer'
										className='font-bold text-teal-700 hover:text-teal-800'
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
										className='font-bold text-teal-700 hover:text-teal-800'
									>
										OpenAI API key.
									</a>
								</li>
								<li>
									Input your API Key when registering for an account (or on the
									settings page when logging in from a new device).
								</li>
							</ol>
						</p>
					</div>
					<p>
						Your API key is stored on your device, never on our servers to keep
						your API key safe. This means that you will need to input your API
						key when logging in from a new device.
					</p>
				</div>

				<div className='flex w-full flex-col gap-4'>
					<h2 className='text-4xl font-semibold uppercase'>Why?</h2>
					<p>
						OpenAI's API is a powerful tool that can be used for a variety of
						purposes. However, the cost of using OpenAI's ChatGPT Plus service
						can be prohibitive for individuals. My-GPT aims to solve this
						problem by providing a pay-as-you-go approach to OpenAI usage using
						your personal API key.
					</p>
					<div>
						<h3 className='text-2xl font-semibold uppercase'>No Limits</h3>
						<p>
							Now users can leverage the power of OpenAI's larger models like
							GPT-4 without the commitment of a fixed monthly fee and without
							daily usage Limits
							<a
								href='https://platform.openai.com/account/rate-limits'
								target='_blank'
								rel='noreferrer'
								className='font-bold text-teal-700 hover:text-teal-800'
							>
								*
							</a>
							. Making it a great choice for both individuals who want to use
							the service a lot and those who only need it occasionally.
						</p>
					</div>
				</div>
			</section>

			<section className='flex w-full flex-col'>
				<Link
					to='/register'
					role='button'
					className='block w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-center text-xl font-semibold uppercase text-white hover:bg-teal-800'
				>
					join my-gpt
				</Link>
				<p className='text-xs'>
					No payment details are required and we dont charge you anything, you
					only pay for what you use with OpenAI.
				</p>
			</section>
		</main>
	);
}

/*
<main className='mx-auto flex w-full max-w-3xl flex-col gap-10 p-2 pt-10'>
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
*/
