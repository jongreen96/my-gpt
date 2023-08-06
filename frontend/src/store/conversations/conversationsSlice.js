import { createSlice } from '@reduxjs/toolkit';
import {
	createConversation,
	fetchConversations,
	updateConversation,
	deleteConversation,
} from './conversationsAPI';

const conversationsSlice = createSlice({
	name: 'conversations',
	initialState: {
		conversations: [],
		status: 'loading', // loading, succeeded, failed
		activeConversation: null,
	},
	reducers: {
		setActiveConversation(state, action) {
			state.activeConversation = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchConversations.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchConversations.fulfilled, (state, action) => {
				state.conversations = action.payload;
				state.status = 'succeeded';
			})
			.addCase(fetchConversations.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateConversation.fulfilled, (state, action) => {
				const updatedConversation = action.payload;
				const index = state.conversations.findIndex(
					(conversation) => conversation.id === updatedConversation.id
				);
				state.conversations[index] = updatedConversation;
			})
			.addCase(updateConversation.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createConversation.fulfilled, (state, action) => {
				state.conversations.push(action.payload);
			})
			.addCase(deleteConversation.fulfilled, (state, action) => {
				const index = state.conversations.findIndex(
					(conversation) => conversation.id === action.payload.id
				);
				state.conversations.splice(index, 1);
			});
	},
});

export const { setActiveConversation } = conversationsSlice.actions;

export const selectConversations = (state) => state.conversations;

export default conversationsSlice.reducer;
