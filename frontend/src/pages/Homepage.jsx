import { Link } from 'react-router-dom';

export default function Homepage() {
	return (
		<main className='mx-auto flex w-full max-w-3xl flex-col gap-10 p-2 pt-10'>
			<h1 className='text-4xl font-semibold uppercase'>
				gpt admin control made simple
			</h1>

			<section className='flex flex-col-reverse gap-5 md:flex-row'>
				<img
					src='https://i.imgur.com/gtSMsOw.png'
					alt='placeholder'
					className='h-full w-full rounded-md shadow-md md:w-1/2'
				/>
				<article className='flex flex-col'>
					<h2 className='text-2xl font-semibold uppercase'>ai assistant</h2>
					<p>
						With ChatGPT&apos;s rising popularity, it&apos;s now more crucial
						than ever to stay in front and take control of your conversations.
						That&apos;s where My-GPT comes in - we offer a powerful platform
						that ensures you&apos;re always one step ahead. It&apos;s time to
						take control of your chat environment and stay in front of the
						curve. Join My-GPT and experience a better way to manage chat
						conversations.
					</p>
					<Link
						to='/register'
						role='button'
						className='mt-auto w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-center text-xl font-semibold uppercase text-white hover:bg-teal-800'
					>
						join my-gpt
					</Link>
				</article>
			</section>

			<section className='flex flex-col-reverse gap-5 md:flex-row-reverse'>
				<img
					src='https://i.imgur.com/reirqi0.png'
					alt='placeholder'
					className='h-full w-full rounded-md shadow-md md:w-1/2'
				/>
				<article>
					<h2 className='text-2xl font-semibold uppercase'>manage accounts</h2>
					<p>
						With My-GPT, you can view and manage the chat history of all the
						accounts under your supervision. This way, you can keep an eye on
						conversations and ensure that everything adheres to community
						standards and guidelines.My GPT allows you to fine-tune how ChatGPT
						responds to messages. You can customize the platform&apos;s settings
						to ensure your child/student&apos;s conversations always stay on
						topic and relevant.
					</p>
				</article>
			</section>

			<section className='flex flex-col-reverse gap-5 md:flex-row'>
				<img
					src='https://i.imgur.com/D5GcqA5.png'
					alt='placeholder'
					className='h-full w-full rounded-md shadow-md md:w-1/2'
				/>
				<article>
					<h2 className='text-2xl font-semibold uppercase'>
						customizable experience
					</h2>
					<ol className='mb-2 list-inside list-disc'>
						<li>Control responses</li>
						<li>Restrict response lengths</li>
						<li>Receive alerts of misuse</li>
					</ol>
					<p>
						Our platform is packed with features that boost productivity and
						improve chat interactions. You&apos;ll enjoy a seamless chat
						experience with our platform, all while ensuring a safe and secure
						communication environment.We are proud to offer a reliable and
						efficient chat management tool that serves parents, educators and
						businesses alike.
					</p>
				</article>
			</section>
		</main>
	);
}
