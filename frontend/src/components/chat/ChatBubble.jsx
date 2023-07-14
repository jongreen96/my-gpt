import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectUserSettings } from '../../store/users/userSlice';
import { Timestamp } from './Timestamp';

export const ChatBubble = ({ message }) => {
	const settings = useSelector(selectUserSettings);

	return message.role === 'user' ? (
		<div className='flex w-full flex-row-reverse gap-2'>
			<p className='w-fit max-w-[90%] rounded-lg rounded-br-none bg-blue p-2 text-white'>
				{message.content}
			</p>
			{settings.timestamps && <Timestamp time={message.time} />}
		</div>
	) : (
		<div className='flex gap-2'>
			<p className='w-fit max-w-[90%] whitespace-normal rounded-lg rounded-bl-none bg-teal-700 p-2 text-white'>
				{message.content}
			</p>
			{settings.timestamps && <Timestamp time={message.time} />}
		</div>
	);
};

ChatBubble.propTypes = {
	message: PropTypes.object.isRequired,
};
