import Api from '../../utils/Api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConversations = createAsyncThunk(
	'conversations/fetchConversations',
	async () => {
		const response = await Api.get('/conversations');
		return response.data;
	}
);

export const updateConversation = createAsyncThunk(
	'conversations/updateConversation',
	async (conversation) => {
		const result = await Api.put(
			`/conversations/${conversation.id}`,
			conversation.conversation
		);
		return result.data;
	}
);
