import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
	return (
		<div className='flex flex-col gap-2'>
			<Link
				to='/login'
				className='mt-auto w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-center text-xl font-semibold uppercase text-white hover:bg-teal-800'
			>
				Login
			</Link>
			<Link
				to='/register'
				className='mt-auto w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-center text-xl font-semibold uppercase text-white hover:bg-teal-800'
			>
				Register
			</Link>
		</div>
	);
}
