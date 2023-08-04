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

		if (
			response.data.conversation[response.data.conversation.length - 1].role ===
			'assistant'
		) {
			response.data.conversation[response.data.conversation.length - 2].usage =
				response.data.conversation[response.data.conversation.length - 1].usage;
		}

		Api.put(`/conversations/${conversation.id}`, response.data);

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

export const deleteConversation = createAsyncThunk(
	'conversations/deleteConversation',
	async (conversationId) => {
		const response = await Api.delete(`/conversations/${conversationId}`);
		return response.data;
	}
);
