export default function SignUp() {
    return (
        <div className='flex h-[100dvh] flex-col items-center justify-center gap-2'>
            <h1 className='text-2xl font-semibold'>Sign Up</h1>
            <form className='flex w-64 flex-col gap-2'>
                <input
                    type='text'
                    placeholder='Username'
                    className='border-bg-light bg-bg-regular rounded-md border-2 p-2'
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='border-bg-light bg-bg-regular rounded-md border-2 p-2'
                />
                <input
                    type='password'
                    placeholder='Confirm Password'
                    className='border-bg-light bg-bg-regular rounded-md border-2 p-2'
                />
                <button
                    type='submit'
                    className='border-bg-light bg-bg-regular m-auto w-1/2 rounded-md border-2 p-2'
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
