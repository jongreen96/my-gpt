import { createSlice } from '@reduxjs/toolkit';
import { login, register } from './userAPI';

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
			});
	},
});

export default userSlice.reducer;
