import axios from 'axios';

const Api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
});

export default Api;
