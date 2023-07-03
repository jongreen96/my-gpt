import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Icons from './assets/Icons';
import Navigation from './components/navigation/Navigation';
import { Account, Chat, Homepage, Login, Register, Settings } from './pages';
import { fetchConversations } from './store/conversations/conversationsAPI';

function App() {
	const dispatch = useDispatch();

	const [authenticated, setAuthenticated] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setAuthenticated(true);
			dispatch(fetchConversations());
		}
	}, [dispatch]);

	return (
		<>
			<Navigation authenticated={authenticated} />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/settings' element={<Settings />} />
				{authenticated && (
					<>
						<Route path='/account' element={<Account />} />
						<Route path='/chat' element={<Chat />} />
					</>
				)}
				<Route path='*' element={<Homepage />} />
			</Routes>
			<Icons.GptLogo />
		</>
	);
}

export default App;
