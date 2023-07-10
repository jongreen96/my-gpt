import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default function NavFooter({ Icons, setMenuOpen, authenticated }) {
	return (
		<div className='flex w-full justify-between p-2'>
			{authenticated && (
				<>
					<NavLink to='/chat' onClick={() => setMenuOpen && setMenuOpen(false)}>
						<Icons.ChatButton />
					</NavLink>

					<NavLink
						to='/account'
						onClick={() => setMenuOpen && setMenuOpen(false)}
					>
						<Icons.AccountButton />
					</NavLink>

					<NavLink
						to='/settings'
						onClick={() => setMenuOpen && setMenuOpen(false)}
					>
						<Icons.SettingsButton />
					</NavLink>
				</>
			)}
		</div>
	);
}

NavFooter.propTypes = {
	Icons: PropTypes.object.isRequired,
	setMenuOpen: PropTypes.func,
	authenticated: PropTypes.bool.isRequired,
};
