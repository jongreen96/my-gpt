export function formatUser(req, res, next) {
	req.body.email = req.body.email.toLowerCase();

	next();
}

export function validateUser(req, res, next) {
	let { email, password } = req.body;

	if (!email || !password)
		return res.status(400).json({ error: 'Missing fields!' });

	if (!RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(email))
		return res.status(400).json({ error: 'Invalid email!' });

	if (!RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/).test(password))
		return res.status(400).json({
			error:
				'Password must be at least 8 characters long and contain at least one number!',
		});

	next();
}

export default { validateUser, formatUser };
