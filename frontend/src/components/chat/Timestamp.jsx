import PropTypes from 'prop-types';

export const Timestamp = ({ time }) => {
	const localTime = new Date(time).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});

	return (
		<p className='w-fit max-w-[90%] select-none self-center text-xs text-gray-500'>
			{localTime || 'Just now'}
		</p>
	);
};

Timestamp.propTypes = {
	time: PropTypes.string,
};
