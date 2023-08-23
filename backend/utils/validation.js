const validateEmail = (email) => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

const validatePassword = (password) => {
	// Minimum eight characters, at least one letter and one number
	const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
	return re.test(password);
};

module.exports = {
	validateEmail,
	validatePassword,
};
