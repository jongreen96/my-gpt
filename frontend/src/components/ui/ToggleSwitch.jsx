import Icons from '../../assets/Icons';

export const ToggleSwitch = ({ setting }) => {
	return (
		<div className='h-8 w-16 rounded-lg rounded-br-none border-2 border-teal-700 bg-light dark:bg-xdark'>
			<div
				className={`flex h-full w-[50%] bg-teal-700 ${
					setting ? 'translate-x-full bg-opacity-100' : 'bg-opacity-50'
				}`}
			>
				<Icons.GptLogoSmall />
			</div>
		</div>
	);
};
