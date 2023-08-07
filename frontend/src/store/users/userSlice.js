import { createSlice } from '@reduxjs/toolkit';
import { login, register, fetchUser, updateSetting } from './userAPI';
import { applyUserSettings } from '../../utils/applyUserSettings';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		status: 'loading',
	},
	reducers: {
		updateTokens(state, action) {
			state.user.tokens = state.user.tokens - action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				localStorage.setItem('token', action.payload.accessToken);
				state.user = action.payload.user;
				state.status = 'succeeded';
				applyUserSettings(state.user.settings);
				window.location.reload();
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
				window.location.reload();
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
				applyUserSettings(state.user.settings);
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})

			.addCase(updateSetting.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateSetting.fulfilled, (state, action) => {
				state.user.settings = action.payload;
				state.status = 'succeeded';
				applyUserSettings(state.user.settings);
			})
			.addCase(updateSetting.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;

export const { updateTokens } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectUserSettings = (state) => state.user.user.settings;
export const selectUserTokens = (state) => state.user.user.tokens;
