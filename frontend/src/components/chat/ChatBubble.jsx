import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserSettings } from '../../store/users/userSlice';
import { Timestamp } from './Timestamp';
import Icons from '../../assets/Icons.jsx';
import { MemoryLimit } from './MemoryLimit';

export const ChatBubble = ({ message, index }) => {
	const settings = useSelector(selectUserSettings);
	const messageArray = message.content.split('```');

	const handleCopyCode = (index, i, part) => {
		navigator.clipboard.writeText(part.split('\n').slice(1).join('\n'));

		const el = document.getElementById(`copy-code-${index}-part-${i}`);
		el.innerText = 'copied!';
		el.classList.remove('text-gray-400');

		setTimeout(() => {
			el.innerText = 'copy code';
			el.classList.add('text-gray-400');
		}, 2000);
	};

	return message.role === 'user' ? (
		<>
			<div className='flex w-full flex-row-reverse gap-2'>
				<div className='w-fit max-w-[90%] rounded-lg rounded-br-none bg-blue p-2 text-white'>
					{message.content}
				</div>
				<div className='flex w-fit max-w-[90%] select-none flex-col items-end self-center text-xs text-gray-500'>
					{settings.timestamps && <Timestamp time={message.time} />}
					{settings.tokens && (
						<p className='flex gap-1'>
							{message.usage?.prompt_tokens}
							{<Icons.Token />}
						</p>
					)}
				</div>
			</div>

			{settings.conversation_memory_length * 2 - 1 === index && <MemoryLimit />}
		</>
	) : (
		<>
			<div className='flex gap-2'>
				<div className='w-fit max-w-[90%] whitespace-normal rounded-lg rounded-bl-none bg-teal-700 p-2 text-white'>
					{messageArray.map((part, i) => (
						<span key={i}>
							{i % 2 === 0 ? (
								part
							) : (
								<>
									<div className='mt-2 flex items-center justify-between rounded-t-lg border-b-[2px] border-dark bg-black px-2 pb-1 font-semibold'>
										{part.split('\n')[0]}
										<p
											className='cursor-pointer text-gray-400 hover:text-gray-200'
											id={`copy-code-${index}-part-${i}`}
											onClick={() => handleCopyCode(index, i, part)}
										>
											copy code
										</p>
									</div>
									<div className='mb-2 rounded-b-lg bg-black p-2'>
										<div className='custom-scrollbar-y overflow-scroll bg-black'>
											<pre>{part.split('\n').slice(1).join('\n').trim()}</pre>
										</div>
									</div>
								</>
							)}
						</span>
					))}
				</div>
				<div className='flex w-fit max-w-[90%] select-none flex-col self-center text-xs text-gray-500'>
					{settings.timestamps && <Timestamp time={message.time} />}
					{settings.tokens && (
						<p className='flex gap-[2px]'>
							{<Icons.Token />}
							{message.usage?.completion_tokens}
						</p>
					)}
				</div>
			</div>

			{settings.conversation_memory_length * 2 - 1 === index && <MemoryLimit />}
		</>
	);
};

ChatBubble.propTypes = {
	message: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
};
