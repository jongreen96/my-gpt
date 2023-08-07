import { useSelector } from 'react-redux';
import { selectUserTokens } from '../store/users/userSlice';

export default function Account() {
	const tokens = useSelector(selectUserTokens);
	return (
		<main>
			<h1>Account</h1>
			<p>Tokens: {tokens}</p>
		</main>
	);
}
