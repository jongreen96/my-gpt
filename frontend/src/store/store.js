import { configureStore } from '@reduxjs/toolkit';
import conversationsReducer from './conversations/conversationsSlice';
import userReducer from './users/userSlice';

const store = configureStore({
	reducer: {
		user: userReducer,
		conversations: conversationsReducer,
	},
});

export default store;
