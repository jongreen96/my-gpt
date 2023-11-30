import { Link } from 'react-router-dom';
import dogFalling from '../assets/dog-falling.gif';
import { OpenAI } from '../assets/Icons';

export default function HomePage() {
    return (
        <>
            <main className='my-32 flex flex-col items-center gap-24'>
                <section className='bg-gradient flex flex-col gap-8 sm:flex-row sm:p-8'>
                    <div className='flex flex-col justify-center gap-4'>
                        <h1 className='font-semibold'>
                            All GPT Models, <br /> No monthly subscription
                        </h1>
                        <p>
                            Experience the power of OpenAI's latest GPT models
                            without the monthly subscription or waitlist.
                        </p>
                        <div className='flex gap-2'>
                            <Link to='/sign-up'>
                                <button className='w-32'>Sign Up</button>
                            </Link>
                            <Link to='/sign-in'>
                                <button className='w-32'>Sign In</button>
                            </Link>
                        </div>
                    </div>
                    <img
                        src={dogFalling}
                        alt='dog falling'
                        className='aspect-square rounded-lg object-cover sm:w-2/5'
                    />
                </section>
                <section className='.bg-gradient flex max-w-5xl flex-col justify-center gap-8 sm:flex-row sm:p-8'>
                    <div className='flex flex-1 flex-col items-center gap-2 text-center'>
                        <div className='w-12'>
                            <OpenAI />
                        </div>
                        <h3 className='text-3xl font-semibold'>GPT-4 </h3>
                        <p className='text-sm'>
                            The latest GPT-4 model with improved instruction
                            following, JSON mode, reproducible outputs, parallel
                            function calling, and more.
                        </p>
                    </div>
                    <div className='flex flex-1 flex-col items-center gap-2 text-center'>
                        <div className='w-12'>
                            <OpenAI />
                        </div>
                        <h3 className='text-3xl font-semibold'>
                            Instant Access
                        </h3>
                        <p className='text-sm'>
                            Get straight into using all of OpenAI's GPT models
                            without the waitlist or monthly subscription. Simply
                            pay for what you use.
                        </p>
                    </div>
                    <div className='flex flex-1 flex-col items-center gap-2 text-center'>
                        <div className='w-12'>
                            <OpenAI />
                        </div>
                        <h3 className='text-3xl font-semibold'>
                            Image Generation
                        </h3>
                        <p className='text-sm'>
                            Use DALL·E, a AI system that can create realistic
                            images and art from a description in natural
                            language.
                        </p>
                    </div>
                </section>
                <section className='flex flex-col justify-center gap-8 sm:p-8'>
                    <div className='flex flex-col gap-8 sm:flex-row sm:p-8'>
                        <h2 className='flex-1 text-4xl font-semibold'>
                            Unleash the Power of GPT-4
                        </h2>
                        <div className='flex flex-1 flex-col'>
                            <p className='text-sm'>
                                GPT-4 is a large multimodal model (accepting
                                text or image inputs and outputting text) that
                                can solve difficult problems with greater
                                accuracy than any of our previous models, thanks
                                to its broader general knowledge and advanced
                                reasoning capabilities.
                            </p>
                        </div>
                    </div>
                    <img
                        src={dogFalling}
                        alt='dog falling'
                        className='aspect-video rounded-lg object-cover'
                    />
                </section>
                <section className='flex flex-col items-center justify-center gap-8 sm:flex-row sm:p-8'>
                    <div className='flex flex-1 flex-col gap-8'>
                        <h2 className='flex-1 text-4xl font-semibold'>
                            Start today with 1,000 free credits
                        </h2>
                        <Link to='/sign-up'>
                            <button className='w-full'>Sign Up</button>
                        </Link>
                    </div>
                    <p className='flex-1 text-sm'>
                        Embark on a limitless journey of creativity and
                        intelligence with OpenAI's cutting-edge models! No more
                        waiting lists or monthly subscriptions - experience the
                        power of AI like never before. From improved instruction
                        following to jaw-dropping image generation with DALL·E,
                        GPT-4 offers unrivaled capabilities. Unleash the
                        potential, seize instant access, and kickstart your AI
                        adventure today. Sign up now and enjoy 1,000 free
                        credits - because your future of innovation starts here!
                    </p>
                </section>
            </main>
            <footer className='mb-10 flex w-full items-center justify-between sm:mb-0'>
                <div className='w-12'>
                    <OpenAI />
                </div>
                <p className='text-sm'>© My-GPT 2023</p>
                <p className='text-sm'>
                    Created by{' '}
                    <a
                        href='https://jongreen.dev/'
                        target='_blank'
                        className='text-primary-100'
                    >
                        jongreen.dev
                    </a>
                </p>
            </footer>
        </>
    );
}
