import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { OpenAI, UserSolid, UserRegular } from '../assets/Icons';
import api from '../utils/api';

export default function Root() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('here');
        const fetchUser = async () => {
            try {
                const res = await api.get('/user');
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, []);

    return (
        <>
            <div className='hover:max-h-3/4 group fixed left-0 top-0 flex h-14 w-full justify-between overflow-hidden border-b-2 border-bg-light bg-bg-regular transition-all hover:h-min sm:left-0 sm:h-screen sm:w-16 sm:flex-col sm:justify-between sm:border-b-0 sm:border-r-2 sm:hover:h-screen sm:hover:w-64'>
                <div className='w-screen sm:w-full'>
                    <div className='flex w-64 gap-2 p-2'>
                        <Link to='/'>
                            <div className='w-10 sm:w-12'>
                                <OpenAI />
                            </div>
                        </Link>
                        <h1 className='select-none text-3xl font-semibold sm:text-5xl'>
                            My-GPT
                        </h1>
                    </div>
                    {!user && (
                        <div className='flex w-full flex-col gap-2 p-2 md:group-hover:w-64'>
                            <Link to='/sign-in'>
                                <button
                                    tabIndex='-1'
                                    className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-100 bg-primary-100 font-semibold transition-all hover:border-text-100'
                                >
                                    <UserSolid />
                                    <p className='hidden group-hover:block'>
                                        Sign In
                                    </p>
                                </button>
                            </Link>
                            <Link to='/sign-up'>
                                <button
                                    tabIndex='-1'
                                    className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                                >
                                    <UserRegular />
                                    <p className='hidden group-hover:block'>
                                        Sign Up
                                    </p>
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
                <img
                    src='./angles-right-solid.svg'
                    alt='open'
                    className='m-3 mt-auto w-8 rotate-90 group-hover:hidden sm:m-4 sm:inline-block sm:rotate-0'
                />
            </div>
            <div className='max-w-7xl p-2 sm:ml-16'>
                <Outlet context={[user, setUser]} />
            </div>
        </>
    );
}
