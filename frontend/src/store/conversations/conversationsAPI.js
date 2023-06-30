import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../../utils/Api';

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
		const response = await Api.put(
			`/conversations/${conversation.id}`,
			conversation
		);
		return response.data;
	}
);

export const createConversation = createAsyncThunk(
	'conversations/createConversation',
	async (conversation) => {
		const response = await Api.post('/conversations/new', conversation);
		return response.data;
	}
);
