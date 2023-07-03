import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../store/users/userAPI';

export default function Login() {
	const dispatch = useDispatch();

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login(form));
	};

	return (
		<main className='mx-auto flex h-full w-full max-w-lg flex-col gap-10 self-center p-2'>
			<section className='flex flex-col gap-5 pb-10'>
				<h1 className='text-4xl font-semibold uppercase'>login</h1>

				<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
					<div className='flex flex-col'>
						<label htmlFor='email' className='text-2xl font-semibold uppercase'>
							email:
						</label>
						<input
							type='email'
							name='email'
							id='email'
							value={form.email}
							onChange={(e) => setForm({ ...form, email: e.target.value })}
							className='rounded-lg rounded-br-none border-2 border-teal-700 bg-light p-2 dark:bg-xdark'
						/>
					</div>

					<div className='flex flex-col'>
						<label
							htmlFor='password'
							className='text-2xl font-semibold uppercase'
						>
							password:
						</label>
						<input
							type='password'
							name='password'
							id='password'
							value={form.password}
							onChange={(e) => setForm({ ...form, password: e.target.value })}
							className='mb-2 rounded-lg rounded-br-none border-2 border-teal-700 bg-light p-2 dark:bg-xdark'
						/>
					</div>

					<button className='rounded-lg rounded-br-none bg-teal-700 p-2 text-xl font-semibold uppercase text-white hover:bg-teal-800'>
						log in
					</button>
				</form>
			</section>

			<Link to='/register' className='fixed bottom-2 w-full max-w-lg pr-4'>
				<button className='w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-xl font-semibold uppercase text-white hover:bg-teal-800'>
					New user?
				</button>
			</Link>
		</main>
	);
}
