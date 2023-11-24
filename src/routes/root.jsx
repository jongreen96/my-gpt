export default function Root() {
	return (
		<div className='hover:w-64 group w-16 bg-bg-200 h-screen fixed transition-all overflow-hidden flex flex-col'>
			<div className='flex p-2 gap-2 w-64'>
				<img src='./openai.svg' alt='openai' className='w-12' />
				<h1 className=' font-semibold select-none'>My-GPT</h1>
			</div>

			<div className='group-hover:w-64 p-2 flex-col gap-2 flex'>
				<button className='flex justify-center items-center gap-2'>
					<img src='./user-solid.svg' alt='sign-in' className='w-4' />
					<p className='hidden group-hover:block'>Sign In</p>
				</button>
				<button className='flex justify-center items-center gap-2'>
					<img
						src='./user-regular.svg'
						alt='sign-in'
						className='w-4 m-auto group-hover:m-0'
					/>
					<p className='hidden group-hover:block'>Sign Up</p>
				</button>
			</div>

			<img
				src='./angles-right-solid.svg'
				alt='open'
				className='mt-auto group-hover:hidden w-8 m-4'
			/>
		</div>
	);
}
