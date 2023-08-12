import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../utils/Api';

export const fetchUsage = createAsyncThunk('usage/fetchUsage', async (user) => {
	const response = await Api.get(`/users/usage`, user);
	return response.data;
});
