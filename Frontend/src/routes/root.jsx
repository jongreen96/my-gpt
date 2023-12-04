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
            <nav className='hover:max-h-3/4 group fixed left-0 top-0 flex h-14 w-full justify-between overflow-hidden border-b-2 border-bg-light bg-bg-regular transition-all hover:h-min sm:left-0 sm:h-screen sm:w-16 sm:flex-col sm:justify-between sm:border-b-0 sm:border-r-2 sm:hover:h-screen sm:hover:w-64'>
                <div className='w-screen sm:w-full'>
                    <div className='flex w-full gap-2 p-2 sm:w-64'>
                        <Link to={user ? '/chat' : '/'}>
                            <div className='w-10 sm:w-12'>
                                <OpenAI />
                            </div>
                        </Link>
                        <h1 className='select-none text-3xl font-semibold sm:text-5xl'>
                            My-GPT
                        </h1>
                        {user && (
                            <div className='ml-auto flex flex-col items-center font-semibold sm:hidden'>
                                <p className='text-sm'>Credits</p>
                                <p>{user.credits || 0}</p>
                            </div>
                        )}
                    </div>
                    {user ? <ConversationMenu /> : <UserMenu />}
                    <Link
                        to='/settings'
                        className='hidden w-full p-2 group-hover:inline-block sm:group-hover:hidden'
                    >
                        <button
                            tabIndex='-1'
                            className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                        >
                            <Settings />
                            <p className='hidden group-hover:block'>Settings</p>
                        </button>
                    </Link>
                </div>
                <div className='m-auto flex flex-col items-center justify-center gap-2 p-2 group-hover:hidden sm:m-0 sm:group-hover:flex'>
                    <img
                        src='./angles-right-solid.svg'
                        alt='open'
                        className='w-8 rotate-90 group-hover:hidden  sm:inline-block sm:rotate-0'
                    />
                    <Link
                        to='/settings'
                        className='hidden w-full sm:inline-block'
                    >
                        <button
                            tabIndex='-1'
                            className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                        >
                            <Settings />
                            <p className='hidden group-hover:block'>Settings</p>
                        </button>
                    </Link>
                    {user && (
                        <div className='hidden flex-col items-center font-semibold sm:flex'>
                            <p className='text-sm'>Credits</p>
                            <p>{user.credits || 0}</p>
                        </div>
                    )}
                </div>
            </nav>
            <div className='h-[100dvh] w-full max-w-7xl pt-14 sm:pl-16 sm:pt-0'>
                <Outlet context={[user, setUser]} />
            </div>
        </>
    );
}
