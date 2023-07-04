import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Icons from './assets/Icons';
import Navigation from './components/navigation/Navigation';
import { Account, Chat, Homepage, Login, Register, Settings } from './pages';
import { fetchUser } from './store/users/userAPI';
import { selectUser } from './store/users/userSlice';

function App() {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);
	useEffect(() => {
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<>
			<Navigation authenticated={!!user} />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/settings' element={<Settings />} />
				{!!user && (
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
