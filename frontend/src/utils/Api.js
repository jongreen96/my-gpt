import axios from 'axios';

const baseURL =
	process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api';

const Api = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
	timeout: 0,
});

export default Api;
