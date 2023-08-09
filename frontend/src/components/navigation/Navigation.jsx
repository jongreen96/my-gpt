import PropTypes from 'prop-types';
import { useState } from 'react';
import Icons from '../../assets/Icons';
import { Conversations, NavFooter, SideMenu } from './';
import Login from './Login';

export default function Navigation({ authenticated }) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			<nav className='sticky top-0 flex h-12 shrink-0 overflow-hidden bg-light/60 p-2 align-middle backdrop-blur-sm dark:bg-xdark/60 md:h-screen md:w-64 md:flex-col md:border-r-2 md:border-r-teal-700'>
				<button onClick={() => setMenuOpen(!menuOpen)} className='md:hidden'>
					<Icons.HamburgerMenuButton />
				</button>

				<h1 className='absolute left-[50%] translate-x-[-50%] text-xl font-bold md:static md:left-0 md:mb-5 md:translate-x-0 md:self-center'>
					My-GPT
				</h1>

				<div className='hidden h-[calc(100%-48px)] flex-col justify-between md:flex'>
					{!authenticated && <Login />}
					{location.pathname === '/chat' && authenticated && <Conversations />}
					<div></div>
					<NavFooter Icons={Icons} authenticated={authenticated} />
				</div>
			</nav>

			{menuOpen && (
				<SideMenu
					Icons={Icons}
					setMenuOpen={setMenuOpen}
					authenticated={authenticated}
				/>
			)}
		</>
	);
}

Navigation.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};
