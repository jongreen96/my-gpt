import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '../components/ui/Dropdown';
import { ToggleSwitch } from '../components/ui/ToggleSwitch';
import { updateSetting } from '../store/users/userAPI';
import { selectUserSettings } from '../store/users/userSlice';

export default function Settings() {
	const dispatch = useDispatch();
	const settings = useSelector(selectUserSettings);

	return (
		<main className='mx-auto flex w-full max-w-3xl grow flex-col gap-10 p-2 pt-10'>
			<h1 className='text-4xl font-semibold uppercase'>Settings</h1>

			<section className='flex flex-col gap-3'>
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

				<div className='flex justify-between'>
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
				</div>

				<div className='flex justify-between'>
					<div>
						<h3 className='text-xl font-semibold'>Conversation Memory</h3>
						<p>
							How many previous messages in the chat history are sent to GPT,
							increasing this number improves conversational ability but can
							increase token use. Setting to ∞ will default to GPT max memory
							length.
						</p>
					</div>
					<select
						className='ml-2 h-8 w-[135px] self-center rounded-lg rounded-br-none border-2 border-teal-700 bg-light outline-none dark:bg-xdark'
						value={settings.conversation_memory_length}
						onChange={(e) =>
							dispatch(
								updateSetting({
									setting: 'conversation_memory_length',
									value: e.target.value,
								})
							)
						}
					>
						<Dropdown length={10} />
					</select>
				</div>

				<div className='flex justify-between'>
					<div>
						<h3 className='text-xl font-semibold'>Token Counter</h3>
						<p>
							Toggle token counter on or off. Usefull to see token usage during
							conversations.
						</p>
					</div>
					<button
						onClick={() =>
							dispatch(
								updateSetting({
									setting: 'tokens',
									value: !settings.tokens,
								})
							)
						}
					>
						<ToggleSwitch setting={settings.tokens} />
					</button>
				</div>
			</section>
		</main>
	);
}
