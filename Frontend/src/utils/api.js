import axios from 'axios';

const baseURL =
    process.env.NODE_ENV === 'production'
        ? '/api'
        : 'http://localhost:3000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export default api;
