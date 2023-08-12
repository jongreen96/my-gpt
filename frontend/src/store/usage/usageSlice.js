import { createSlice } from '@reduxjs/toolkit';
import { fetchUsage } from './usageAPI';

const usageSlice = createSlice({
	name: 'usage',
	initialState: {
		usage: [],
		status: 'idle',
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUsage.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUsage.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.usage = action.payload;
			});
	},
});

export default usageSlice.reducer;

export const selectUsage = (state) => state.usage.usage;
