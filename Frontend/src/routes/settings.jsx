import { useOutletContext, useNavigate } from 'react-router-dom';
import { CheckboxChecked, CheckboxUnchecked } from '../assets/Icons';
import openAIModels from '../utils/openAIModels';
import api from '../utils/api';

export default function Settings() {
    const navigate = useNavigate();
    const [user, setUser] = useOutletContext();

    if (!user) return null;

    return (
        <>
            <h1 className='mt-20 p-2 text-4xl font-semibold'>Settings</h1>
            <div className='flex flex-col gap-24 p-2 sm:flex-row sm:justify-between'>
                <section className='flex w-full flex-1 flex-col gap-2'>
                    <h2 className='text-2xl font-semibold'>General</h2>

                    <div className='flex w-full flex-col justify-between gap-2 rounded-lg border border-bg-light bg-bg-regular p-2'>
                        <div className='flex items-center justify-between'>
                            <p>Default model</p>
                            <select
                                onChange={(e) => {
                                    const updatedUser = { ...user };
                                    updatedUser.settings.default_model =
                                        e.target.value;
                                    setUser(updatedUser);
                                    api.patch('/user', {
                                        settings: updatedUser.settings,
                                    });
                                }}
                                defaultValue={user.settings.default_model}
                                className='h-fit rounded border-2 bg-bg-dark py-1'
                            >
                                {Object.keys(openAIModels).map((model) => (
                                    <option key={model} value={model}>
                                        {model}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <p className='text-sm'>
                            {openAIModels[user.settings.default_model]}
                        </p>
                    </div>

                    <div className='flex w-full justify-between rounded-lg border border-bg-light bg-bg-regular p-2'>
                        <p>Dark mode</p>
                        <button
                            onClick={() => {
                                const updatedUser = { ...user };
                                updatedUser.settings.darkmode =
                                    !updatedUser.settings.darkmode;
                                setUser(updatedUser);
                                api.patch('/user', {
                                    settings: updatedUser.settings,
                                });
                            }}
                            className='pr-5 sm:pr-0'
                        >
                            {user.settings.darkmode ? (
                                <CheckboxChecked />
                            ) : (
                                <CheckboxUnchecked />
                            )}
                        </button>
                    </div>

                    <div className='flex w-full justify-between rounded-lg border border-bg-light bg-bg-regular p-2'>
                        <p>Timestamp messages</p>
                        <button
                            onClick={() => {
                                const updatedUser = { ...user };
                                updatedUser.settings.timestamps =
                                    !updatedUser.settings.timestamps;
                                setUser(updatedUser);
                                api.patch('/user', {
                                    settings: updatedUser.settings,
                                });
                            }}
                            className='pr-5 sm:pr-0'
                        >
                            {user.settings.timestamps ? (
                                <CheckboxChecked />
                            ) : (
                                <CheckboxUnchecked />
                            )}
                        </button>
                    </div>

                    <div className='flex w-full justify-between rounded-lg border border-bg-light bg-bg-regular p-2'>
                        <p>Credit counter</p>
                        <button
                            onClick={() => {
                                const updatedUser = { ...user };
                                updatedUser.settings.credits =
                                    !updatedUser.settings.credits;
                                setUser(updatedUser);
                                api.patch('/user', {
                                    settings: updatedUser.settings,
                                });
                            }}
                            className='pr-5 sm:pr-0'
                        >
                            {user.settings.credits ? (
                                <CheckboxChecked />
                            ) : (
                                <CheckboxUnchecked />
                            )}
                        </button>
                    </div>

                    <div className='flex w-full items-center justify-between rounded-lg border border-bg-light bg-bg-regular p-2'>
                        <p>Conversation memory limit</p>
                        <select
                            onChange={(e) => {
                                const updatedUser = { ...user };
                                updatedUser.settings.memory = e.target.value;
                                setUser(updatedUser);
                                api.patch('/user', {
                                    settings: updatedUser.settings,
                                });
                            }}
                            defaultValue={user.settings.memory}
                            className='h-fit rounded border-2 bg-bg-dark py-1'
                        >
                            <option value='Unlimited'>Unlimited</option>
                            {new Array(100).fill(0).map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                <section className='flex w-full flex-1 flex-col gap-2'>
                    <h2 className='text-2xl font-semibold'>Account</h2>

                    <div className='flex w-full justify-between overflow-hidden rounded-lg border border-bg-light bg-bg-regular p-2'>
                        <p>Email:</p>
                        <p>{user.email}</p>
                    </div>

                    <div className='flex w-full justify-between overflow-hidden rounded-lg border border-bg-light bg-bg-regular p-2'>
                        <p>Credits:</p>
                        <p>{user.credits}</p>
                    </div>

                    <button
                        className='h-12 w-full rounded-lg border-2 border-bg-regular bg-bg-regular font-semibold transition-all hover:border-text-100'
                        onClick={() => navigate('/change-password')}
                    >
                        Change password
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            setUser(null);
                            navigate('/');
                        }}
                        className='h-12 w-full rounded-lg border-2 border-primary-100 bg-primary-100 font-semibold transition-all hover:border-text-100'
                    >
                        Log out
                    </button>
                </section>
            </div>
        </>
    );
}
