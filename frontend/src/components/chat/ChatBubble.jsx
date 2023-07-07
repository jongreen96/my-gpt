import PropTypes from 'prop-types';

export const ChatBubble = ({ message }) => {
	return message.role === 'user' ? (
		<p className='w-fit max-w-[90%] self-end rounded-lg rounded-br-none bg-blue p-2 text-white'>
			{message.content}
		</p>
	) : (
		<p className='w-fit max-w-[90%] whitespace-normal rounded-lg rounded-bl-none bg-teal-700 p-2 text-white'>
			{message.content}
		</p>
	);
};

ChatBubble.propTypes = {
	message: PropTypes.object.isRequired,
};
