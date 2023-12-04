import { useRouteError } from 'react-router-dom';
import { Link } from 'react-router-dom';
import dogFalling from '../assets/dog-falling.gif';

export default function ErrorPage() {
    const { error } = useRouteError();

    return (
        <div
            className='flex h-[100svh] w-[100vw] flex-col items-center justify-center gap-2 bg-cover'
            style={{ backgroundImage: `url(${dogFalling})` }}
        >
            <div className='bg-bg-100 flex flex-col items-center gap-2 rounded-md bg-opacity-80 p-2'>
                <h1 className='text-5xl font-semibold'>Oops! {error.status}</h1>
                <p className='text-xl'>Something went wrong</p>
                <p className='text-xs'>{error.message}</p>
                <Link to='/chat' className='text-blue-500 hover:underline'>
                    <button
                        tabIndex='-1'
                        className='h-12 w-32 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                    >
                        Go back home
                    </button>
                </Link>
            </div>
        </div>
    );
}