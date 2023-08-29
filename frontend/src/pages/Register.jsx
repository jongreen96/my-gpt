import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../store/users/userAPI';
import { validateEmail, validatePassword } from '../utils/validation';

export default function Login() {
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState('');

	const [form, setForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		apikey: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			form.apikey !== '' &&
			/^sk-[a-zA-Z0-9]{48}$/.test(form.apikey) === false
		) {
			setErrorMessage('Invalid API Key');
			return;
		}

		if (form.password !== form.confirmPassword) {
			setErrorMessage('Passwords do not match');
			return;
		}

		if (!validateEmail(form.email)) {
			setErrorMessage('Invalid Email Address');
			return;
		}

		if (!validatePassword(form.password)) {
			setErrorMessage(
				'Password must be: A minimum of 8 characters, contain at least 1 uppercase letter and at least 1 number.'
			);
			return;
		}

		setErrorMessage('');

		localStorage.setItem('apikey', form.apikey);
		dispatch(register(form));
	};

	return (
		<main className='mx-auto flex h-full w-full max-w-lg flex-col gap-10 self-center p-2'>
			<section className='flex flex-col gap-5 pb-10'>
				<h1 className='text-4xl font-semibold uppercase'>register</h1>

				<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
					<div className='flex flex-col'>
						<label htmlFor='email' className='text-2xl font-semibold uppercase'>
							email:
						</label>
						<input
							type='email'
							name='email'
							id='email'
							className='rounded-lg rounded-br-none border-2 border-teal-700 bg-light p-2 dark:bg-xdark'
							value={form.email}
							onChange={(e) => setForm({ ...form, email: e.target.value })}
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
							className='rounded-lg rounded-br-none border-2 border-teal-700 bg-light p-2 dark:bg-xdark'
							value={form.password}
							onChange={(e) => setForm({ ...form, password: e.target.value })}
						/>
					</div>

					<div className='flex flex-col'>
						<label
							htmlFor='confirm-password'
							className='text-2xl font-semibold uppercase'
						>
							confirm password:
						</label>
						<input
							type='password'
							name='confirm-password'
							id='confirm-password'
							className='rounded-lg rounded-br-none border-2 border-teal-700 bg-light p-2 dark:bg-xdark'
							value={form.confirmPassword}
							onChange={(e) =>
								setForm({ ...form, confirmPassword: e.target.value })
							}
						/>
					</div>

					<div className='flex flex-col'>
						<label
							htmlFor='apikey'
							className='text-2xl font-semibold uppercase'
						>
							api key:
						</label>
						<input
							type='password'
							name='apikey'
							id='apikey'
							placeholder='Optional at registration'
							className='rounded-lg rounded-br-none border-2 border-teal-700 bg-light p-2 dark:bg-xdark'
							value={form.apikey}
							onChange={(e) => setForm({ ...form, apikey: e.target.value })}
						/>
						<p className='pt-2 text-xs'>
							Please note that for security reasons, we do not store API keys in
							our database. Instead, it's stored in your browser's local
							storage. If you clear your browser data or use a different device,
							you will need to re-enter your API key in your account settings.
						</p>
					</div>

					<p className='text-center text-red-600'>{errorMessage}</p>

					<button className='rounded-lg rounded-br-none bg-teal-700 p-2 text-xl font-semibold uppercase text-white hover:bg-teal-800'>
						create account
					</button>
				</form>
			</section>

			<Link to='/login' className='fixed bottom-2 w-full max-w-lg pr-4'>
				<button className='w-full rounded-lg rounded-br-none bg-teal-700 p-2 text-xl font-semibold uppercase text-white hover:bg-teal-800'>
					Existing user?
				</button>
			</Link>
		</main>
	);
}
