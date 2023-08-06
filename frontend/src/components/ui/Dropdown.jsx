import PropTypes from 'prop-types';

export const Dropdown = ({ length }) => {
	return (
		<>
			<option value={0}>∞</option>
			{[...Array(length).keys()].map((i) => (
				<option key={i} value={i + 1}>
					{i + 1}
				</option>
			))}
		</>
	);
};

Dropdown.propTypes = {
	length: PropTypes.number.isRequired,
};
