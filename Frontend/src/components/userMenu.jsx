import { UserSolid, UserRegular } from '../assets/Icons';
import { Link } from 'react-router-dom';

export default function UserMenu() {
    return (
        <>
            <div className='flex w-full flex-col gap-2 p-2 md:group-hover:w-64'>
                <Link to='/sign-in'>
                    <button
                        tabIndex='-1'
                        className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-100 bg-primary-100 font-semibold transition-all hover:border-text-100'
                    >
                        <UserSolid />
                        <p className='hidden group-hover:block'>Sign In</p>
                    </button>
                </Link>
                <Link to='/sign-up'>
                    <button
                        tabIndex='-1'
                        className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                    >
                        <UserRegular />
                        <p className='hidden group-hover:block'>Sign Up</p>
                    </button>
                </Link>
            </div>
        </>
    );
}
