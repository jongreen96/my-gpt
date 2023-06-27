import { Routes, Route } from 'react-router-dom';
import Icons from './assets/Icons';
import { Homepage, Account, Chat, Login, Register, Settings } from './pages';
import Navigation from './components/navigation/Navigation';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchConversations } from './store/conversations/conversationsAPI';

function App() {
	const dispatch = useDispatch();
	const authenticated = true;

	useEffect(() => {
		dispatch(fetchConversations());
	});

	return (
		<>
			<Navigation authenticated={authenticated} />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/account' element={<Account />} />
				<Route path='/chat/:id' element={<Chat />} />
				<Route path='/chat' element={<Chat />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/settings' element={<Settings />} />
			</Routes>
			<Icons.GptLogo />
		</>
	);
}

export default App;
