import { configureStore } from '@reduxjs/toolkit';
import conversationsReducer from './conversations/conversationsSlice';
import userReducer from './users/userSlice';
import usageReducer from './usage/usageSlice';

const store = configureStore({
	reducer: {
		user: userReducer,
		conversations: conversationsReducer,
		usage: usageReducer,
	},
});

export default store;
