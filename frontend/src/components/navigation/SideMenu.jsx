import PropTypes from 'prop-types';
import React from 'react';
import Conversations from './Conversations';
import NavFooter from './NavFooter';
import Login from './Login';

export default function SideMenu({ Icons, authenticated, setMenuOpen }) {
	return (
		<aside
			onClick={() => setMenuOpen(false)}
			className='fixed left-0 top-12 z-40 flex h-[calc(100%-48px)] w-64 max-w-[100vw] animate-slide-in flex-col justify-between bg-light/60 p-2 backdrop-blur-sm dark:bg-xdark/60'
		>
			{!authenticated && <Login />}
			{authenticated && <Conversations />}
			<NavFooter Icons={Icons} authenticated={authenticated} />
		</aside>
	);
}

SideMenu.propTypes = {
	Icons: PropTypes.object.isRequired,
	setMenuOpen: PropTypes.func.isRequired,
	authenticated: PropTypes.bool.isRequired,
};
