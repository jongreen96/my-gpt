import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserSettings } from '../../store/users/userSlice';
import { Timestamp } from './Timestamp';
import Icons from '../../assets/Icons.jsx';
import { MemoryLimit } from './MemoryLimit';

export const ChatBubble = ({ message, i }) => {
	const settings = useSelector(selectUserSettings);

	const codeRegex = /```(\w+)\n([\s\S]+?)\n```/g;
	const formattedMessage = message.content.replace(
		codeRegex,
		`<div class="bg-black rounded-t-lg font-semibold px-2 pb-1 mt-2">$1</div>
		<div class="p-2 rounded-b-lg mb-2 bg-black"><div class="bg-black pb-2 overflow-scroll custom-scrollbar-y"><pre><code>$2</code></pre></div></div>`
	);

	return message.role === 'user' ? (
		<>
			<div className='flex w-full flex-row-reverse gap-2'>
				<p className='w-fit max-w-[90%] rounded-lg rounded-br-none bg-blue p-2 text-white'>
					{formattedMessage}
				</p>
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

			{settings.conversation_memory_length * 2 - 1 === i && <MemoryLimit />}
		</>
	) : (
		<>
			<div className='flex gap-2'>
				<p
					className='w-fit max-w-[90%] whitespace-normal rounded-lg rounded-bl-none bg-teal-700 p-2 text-white'
					dangerouslySetInnerHTML={{ __html: formattedMessage }}
				/>
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
		</>
	);
};

ChatBubble.propTypes = {
	message: PropTypes.object.isRequired,
	i: PropTypes.number.isRequired,
};
