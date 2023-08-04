import PropTypes from 'prop-types';

export const Timestamp = ({ time }) => {
	const localTime = new Date(time).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});

	return <p>{localTime || 'Just now'}</p>;
};

Timestamp.propTypes = {
	time: PropTypes.string,
};
