import { Routes, Route } from 'react-router-dom';
import Icons from './assets/Icons';
import { Homepage, Account, Chat, Login, Register, Settings } from './pages';
import Navigation from './components/navigation/Navigation';

function App() {
	const authenticated = true;
	return (
		<>
			<Navigation authenticated={authenticated} />
			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/account' element={<Account />} />
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
