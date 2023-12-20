import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

import DogFalling from '../../public/dog-falling.gif';
import OpenAI from '../../public/openai.svg';

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect('/chat');
  }

  return (
    <div className='my-20 flex flex-col gap-24 p-2'>
      <section className='flex flex-col gap-8 sm:flex-row sm:p-8'>
        <div className='flex flex-col justify-center gap-4 text-center sm:text-left'>
          <h1 className='text-5xl font-semibold'>
            All GPT Models, <br /> No monthly subscription
          </h1>

          <p>
            Experience the power of OpenAI&apos;s latest GPT models without the
            monthly subscription or waitlist.
          </p>

          <div className='flex w-full justify-center gap-2 sm:justify-start'>
            <Link
              href='/sign-up'
              className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-900 p-2 font-semibold hover:bg-blue-800'
            >
              <p className='group-hover:block'>Try For Free</p>
            </Link>
          </div>
        </div>

        <div className='hidden sm:block'>
          <Image
            src={DogFalling}
            alt='Dog Falling'
            className='rounded-lg'
            priority
          />
        </div>
      </section>

      <section className='flex max-w-5xl flex-col justify-center gap-8 sm:flex-row sm:p-8'>
        <div className='flex flex-1 flex-col items-center gap-2 text-center'>
          <Image src={OpenAI} alt='OpenAI Logo' width={48} height={48} />

          <h3 className='text-3xl font-semibold'>GPT-4 </h3>

          <p className='text-sm'>
            The latest GPT-4 model with improved instruction following, JSON
            mode, reproducible outputs, parallel function calling, and more.
          </p>
        </div>

        <div className='flex flex-1 flex-col items-center gap-2 text-center'>
          <Image src={OpenAI} alt='OpenAI Logo' width={48} height={48} />

          <h3 className='text-3xl font-semibold'>Instant Access</h3>

          <p className='text-sm'>
            Get straight into using all of OpenAI&apos;s GPT models without the
            waitlist or monthly subscription. Simply pay for what you use.
          </p>
        </div>

        <div className='flex flex-1 flex-col items-center gap-2 text-center'>
          <Image src={OpenAI} alt='OpenAI Logo' width={48} height={48} />

          <h3 className='text-3xl font-semibold'>Image Generation</h3>

          <p className='text-sm'>
            Use DALL·E, a AI system that can create realistic images and art
            from a description in natural language.
          </p>
        </div>
      </section>

      <section className='flex flex-col justify-center gap-8'>
        <div className='flex flex-col gap-8 sm:flex-row sm:p-8'>
          <h2 className='flex-1 text-center text-4xl font-semibold sm:text-left'>
            Unleash the Power of GPT-4
          </h2>

          <div className='flex flex-1 flex-col'>
            <p className='text-center text-sm sm:text-left'>
              GPT-4 is a large multimodal model (accepting text or image inputs
              and outputting text) that can solve difficult problems with
              greater accuracy than any previous models, thanks to its broader
              general knowledge and advanced reasoning capabilities.
            </p>
          </div>
        </div>
      </section>

      <section className='flex flex-col items-center justify-center gap-8 sm:flex-row sm:p-8'>
        <div className='flex flex-1 flex-col gap-8'>
          <h2 className='flex-1 text-4xl font-semibold'>
            Start today with 1,000 free credits
          </h2>
          <Link
            href='/sign-up'
            className='flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-900 p-2 font-semibold hover:bg-blue-800'
          >
            <p className='group-hover:block'>Try For Free</p>
          </Link>
        </div>
        <p className='flex-1 text-sm'>
          Embark on a limitless journey of creativity and intelligence with
          OpenAI&apos;s cutting-edge models! No more waiting lists or monthly
          subscriptions - experience the power of AI like never before. From
          improved instruction following to jaw-dropping image generation with
          DALL·E, GPT-4 offers unrivaled capabilities. Unleash the potential,
          seize instant access, and kickstart your AI adventure today. Sign up
          now and enjoy 1,000 free credits - because your future of innovation
          starts here!
        </p>
      </section>

      <footer className='flex w-full items-center justify-between p-2'>
        <Image src={OpenAI} alt='OpenAI Logo' width={48} height={48} />
        <p className='text-sm'>© My-GPT 2023</p>
        <p className='text-sm'>
          Created by{' '}
          <a
            href='https://jongreen.dev/'
            target='_blank'
            className='text-blue-900'
          >
            jongreen.dev
          </a>
        </p>
      </footer>
    </div>
  );
}
