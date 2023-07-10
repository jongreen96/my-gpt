import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../utils/Api';

export const login = createAsyncThunk('user/login', async (user) => {
	const response = await Api.post('/users/login', user);
	return response.data;
});

export const register = createAsyncThunk('user/register', async (user) => {
	const response = await Api.post('/users/register', user);
	return response.data;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
	const response = await Api.get('/users');
	return response.data;
});

export const updateSetting = createAsyncThunk(
	'user/updateSetting',
	async ({ setting, value }) => {
		const response = await Api.put('/users/settings', { setting, value });
		return response.data;
	}
);
