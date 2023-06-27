import { configureStore } from '@reduxjs/toolkit';
import conversationsReducer from './conversations/conversationsSlice';

const store = configureStore({
	reducer: {
		conversations: conversationsReducer,
	},
});

export default store;
