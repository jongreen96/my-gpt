import { OpenAI, UserSolid, UserRegular } from '../assets/Icons';

export default function Root() {
    return (
        <div className='group fixed left-0 flex h-[100svh] w-16 flex-col overflow-hidden border-r-2 border-bg-300 bg-bg-200 transition-all hover:w-64'>
            <div className='flex w-64 gap-2 p-2'>
                <OpenAI />
                <h1 className=' select-none font-semibold'>My-GPT</h1>
            </div>
            <div className='flex flex-col gap-2 p-2 group-hover:w-64'>
                <a href='/sign-in'>
                    <button
                        tabIndex='-1'
                        className='flex w-full items-center justify-center gap-2'
                    >
                        <UserSolid />
                        <p className='hidden group-hover:block'>Sign In</p>
                    </button>
                </a>
                <a href='/sign-up'>
                    <button
                        tabIndex='-1'
                        className='flex w-full items-center justify-center gap-2'
                    >
                        <UserRegular />
                        <p className='hidden group-hover:block'>Sign Up</p>
                    </button>
                </a>
            </div>
            <img
                src='./angles-right-solid.svg'
                alt='open'
                className='m-4 mt-auto w-8 group-hover:hidden'
            />
        </div>
    );
}
