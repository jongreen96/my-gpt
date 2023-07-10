import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserSettings } from '../store/users/userSlice';
import { updateSetting } from '../store/users/userAPI';

export default function Settings() {
	const dispatch = useDispatch();
	const settings = useSelector(selectUserSettings);

	const handleLogout = () => {
		localStorage.removeItem('token');
		window.location.reload();
	};

	return (
		<main className='mx-auto flex w-full max-w-3xl grow flex-col gap-10 p-2 pt-10'>
			<h1 className='text-4xl font-semibold uppercase'>Settings</h1>

			<section className='flex flex-col gap-2'>
				<h2 className='text-2xl font-semibold uppercase'>Account Settings</h2>

				<div className='flex justify-between'>
					<div>
						<h3 className='text-xl font-semibold'>Dark Mode</h3>
						<p>Toggle dark mode on or off.</p>
					</div>
					<button
						onClick={() =>
							dispatch(
								updateSetting({
									setting: 'dark_mode',
									value: !settings.dark_mode,
								})
							)
						}
					>
						<ToggleSwitch setting={settings.dark_mode} />
					</button>
				</div>

				{/* <div className='flex justify-between'>
					<div>
						<h3 className='text-xl font-semibold'>Timestamp Messages</h3>
						<p>Toggle timestamps on or off.</p>
					</div>
					<button
						onClick={() =>
							dispatch(
								updateSetting({
									setting: 'timestamps',
									value: !settings.timestamps,
								})
							)
						}
					>
						<ToggleSwitch setting={settings.timestamps} />
					</button>
				</div> */}
			</section>

			<section className='flex flex-col gap-2'>
				<h2 className='text-2xl font-semibold uppercase'>Admin Settings</h2>
			</section>

			<button
				onClick={handleLogout}
				className='fixed bottom-2 w-[calc(100%-16px)] max-w-lg self-center rounded-lg rounded-br-none bg-teal-700 p-2 text-xl font-semibold uppercase text-white hover:bg-teal-800'
			>
				Logout
			</button>
		</main>
	);
}
