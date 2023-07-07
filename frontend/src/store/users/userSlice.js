import { createSlice } from '@reduxjs/toolkit';
import { login, register, fetchUser } from './userAPI';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		status: 'loading',
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				localStorage.setItem('token', action.payload.accessToken);
				state.user = action.payload.user;
				state.status = 'succeeded';
			})
			.addCase(login.rejected, (state, action) => {
				localStorage.removeItem('token');
				state.status = 'failed';
				state.user = null;
				state.error = action.error.message;
			})
			.addCase(register.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(register.fulfilled, (state, action) => {
				localStorage.setItem('token', action.payload.accessToken);
				state.user = action.payload.user;
				state.status = 'succeeded';
			})
			.addCase(register.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.status = 'succeeded';
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;

export const selectUser = (state) => state.user;
