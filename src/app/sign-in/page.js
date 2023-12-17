export default function SignIn() {
  return (
    <section className='flex h-full flex-col items-center justify-center gap-2'>
      <h1 className='text-2xl font-semibold'>Sign In</h1>
      <form className='flex w-64 flex-col gap-2'>
        <input
          type='text'
          placeholder='Email'
          className='rounded-md border-2 border-gray-200 bg-gray-200 p-2'
        />
        <input
          type='password'
          placeholder='Password'
          className='rounded-md border-2 border-gray-200 bg-gray-200 p-2'
        />
        <button
          type='submit'
          className='m-auto w-1/2 rounded-md bg-blue-900 p-2 font-semibold hover:bg-blue-800'
        >
          Sign In
        </button>
      </form>
    </section>
  );
}
