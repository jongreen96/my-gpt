import { createSlice } from '@reduxjs/toolkit';
import { fetchConversations, updateConversation } from './conversationsAPI';

const conversationsSlice = createSlice({
	name: 'conversations',
	initialState: {
		conversations: [],
		selectedConversation: null,
	},
	reducers: {
		setSelectedConversation(state, action) {
			state.selectedConversation = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchConversations.fulfilled, (state, action) => {
				state.conversations = action.payload;
			})
			.addCase(updateConversation.fulfilled, (state, action) => {
				const updatedConversation = action.payload;
				const index = state.conversations.findIndex(
					(conversation) => conversation.id === updatedConversation.id
				);
				state.conversations[index] = updatedConversation;
			});
	},
});

export const { setSelectedConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
