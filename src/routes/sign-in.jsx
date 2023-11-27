export default function SignIn() {
    return (
        <div className='flex h-screen flex-col items-center justify-center gap-2'>
            <h1 className='text-2xl font-semibold'>Sign In</h1>
            <form className='flex w-64 flex-col gap-2'>
                <input
                    type='text'
                    placeholder='Username'
                    className='rounded-md border-2 border-bg-300 bg-bg-200 p-2'
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='rounded-md border-2 border-bg-300 bg-bg-200 p-2'
                />
                <button
                    type='submit'
                    className='m-auto w-1/2 rounded-md border-2 border-bg-300 bg-bg-200 p-2'
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}
