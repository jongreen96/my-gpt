import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<main className='mx-auto flex w-full max-w-3xl flex-col gap-10 p-2 pt-10'>
			<h1 className='text-4xl font-semibold uppercase'>gpt made simple</h1>

			<div className='flex flex-col gap-2'>
				<p className='text-lg'>
					Want to use GPT-4 but dont feel you use it enough to justify $20 a
					month? My-GPT is the solution, using your own API key to interact with
					the OpenAI API, you can use GPT-4 (or any other models) and only pay
					for what you use.
				</p>
				<p>
					No payment details are required and we dont charge you anything, you
					only pay for what you use with OpenAI.
				</p>
				<Link
					to='/register'
					role='button'
					className='mt-auto w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-center text-xl font-semibold uppercase text-white hover:bg-teal-800'
				>
					join my-gpt
				</Link>
			</div>

			<div className='flex flex-col gap-2'>
				<h2 className='text-2xl font-semibold uppercase'>how it works</h2>
				<p className='text-lg'>
					My-GPT is a simple web app that uses your OpenAI API key to interact
					with the OpenAI API. We dont store your API key, we simply pass it
					along to OpenAI when you make a request.
				</p>
				<p className='text-lg'>
					When you make a request, we send your API key to OpenAI and they
					return the response to us. We then display the response to you.
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
				<h2 className='text-2xl font-semibold uppercase'>
					This site is in early beta, many features are not yet implemented
				</h2>
				<p className='text-lg'>
					We are working hard to bring you the best experience possible, but
					please be patient with us as we are still in early beta.
				</p>
				<p className='text-lg'>We are working on many features, including:</p>
				<ul className='list-inside list-disc'>
					<li>Custom models (currently defaults to gpt-3.5-turbo)</li>
					<li>Custom prompts (ability to use system messages)</li>
				</ul>
				<p>
					Were currently taking feedback on what you want to see included,
					please feel free to share what you would like to see:
					jongreen1996@gmail.com
				</p>
			</div>
		</main>
	);
}
