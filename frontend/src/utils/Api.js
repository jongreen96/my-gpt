import axios from 'axios';

const Api = axios.create({
	baseURL: 'http://localhost:3000/api',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
});

export default Api;
