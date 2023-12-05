import { useOutletContext, useNavigate } from 'react-router-dom';

export default function Settings() {
    const navigate = useNavigate();
    const [user, setUser] = useOutletContext();
    return (
        <div className='my-20 flex flex-col gap-24 p-2'>
            <h1 className='text-4xl font-semibold'>Settings</h1>
            <section>
                <h2 className='text-2xl font-semibold'>General</h2>
                <div>
                    <p>Dark mode</p>
                    <button></button>
                </div>
            </section>

            {user && (
                <section>
                    <h2 className='text-2xl font-semibold'>Account</h2>
                    <div>
                        <p>Username</p>
                        <p>{user.username}</p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <p>Credits</p>
                        <p>{user.credits}</p>
                    </div>
                    <div>
                        <p>logout</p>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                setUser(null);
                                navigate('/');
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}
