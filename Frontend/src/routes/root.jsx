import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { OpenAI, Settings } from '../assets/Icons';
import api from '../utils/api';
import UserMenu from '../components/userMenu';
import ConversationMenu from '../components/conversationMenu';

export default function Root() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (!localStorage.getItem('token')) return;
                const res = await api.get('/user');
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (user && window.location.pathname === '/') {
            navigate('/chat');
        }
    }, [user]);

    return (
        <>
            <nav className='group fixed left-0 flex h-14 w-full flex-col overflow-hidden border-b-2 border-bg-light bg-bg-regular hover:h-auto hover:max-h-[75vh] sm:h-full sm:w-16 sm:border-b-0 sm:border-r-2 sm:hover:h-full sm:hover:max-h-screen sm:hover:w-64'>
                <div className='flex items-center justify-between pr-2'>
                    <div className='flex gap-2 p-2'>
                        <Link to={user ? '/chat' : '/'}>
                            <div className='w-10 sm:w-12'>
                                <OpenAI />
                            </div>
                        </Link>
                        <h1 className='select-none text-3xl font-semibold sm:w-60 sm:text-5xl'>
                            My-GPT
                        </h1>
                    </div>
                    <div className='flex gap-2 sm:hidden'>
                        <img
                            src='./angles-right-solid.svg'
                            alt='open'
                            className='w-8 rotate-90 group-hover:hidden sm:inline-block sm:rotate-0'
                        />
                        {user && (
                            <div className='text-center font-semibold'>
                                <p className='text-sm'>Credits</p>
                                <p>{user.credits || 0}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className='no-scrollbar flex h-full flex-col justify-between overflow-scroll'>
                    <div className='w-screen sm:w-full'>
                        {user ? <ConversationMenu /> : <UserMenu />}
                    </div>
                </div>
                {user && (
                    <Link
                        to='/settings'
                        className='hidden w-full p-2 pt-4 group-hover:inline-block sm:group-hover:hidden'
                    >
                        <button
                            tabIndex='-1'
                            className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                        >
                            <Settings />
                            <p className='hidden group-hover:block'>Settings</p>
                        </button>
                    </Link>
                )}

                {/* Only shows up on wide screens */}
                <div className='hidden flex-col gap-2 self-center py-2 sm:flex'>
                    <img
                        src='./angles-right-solid.svg'
                        alt='open'
                        className='ml-2 w-8 rotate-90 group-hover:hidden sm:inline-block sm:rotate-0'
                    />
                    {user && (
                        <>
                            <div className='text-center font-semibold'>
                                <p className='text-sm'>Credits</p>
                                <p>{user.credits || 0}</p>
                            </div>
                            <Link
                                to='/settings'
                                className='w-full group-hover:inline-block group-hover:w-60'
                            >
                                <button
                                    tabIndex='-1'
                                    className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                                >
                                    <Settings />
                                    <p className='hidden group-hover:inline-block'>
                                        Settings
                                    </p>
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            <div className='h-[100dvh] w-full max-w-7xl pt-14 sm:pl-16 sm:pt-0'>
                <Outlet context={[user, setUser]} />
            </div>
        </>
    );
}
