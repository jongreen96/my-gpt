import nodemailer from 'nodemailer';

export const sendVerification = async (recipient, link) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_ADDRESS,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const message = {
		from: `${process.env.EMAIL_USERNAME}`,
		to: recipient,
		subject: 'Verify your email address',
		text: `Please follow this link to verify your email address: ${link}`,
	};

	try {
		await transporter.sendMail(message);
	} catch (error) {
		console.log(error);
	}
};

export default sendVerification;
