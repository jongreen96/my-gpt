import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function SignIn() {
    const navigate = useNavigate();
    const [user, setUser] = useOutletContext();
    const [form, setForm] = useState({
        email: '',
        password: '',
        error: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setForm({ ...form, error: 'Please fill out all fields' });
            return;
        }

        if (
            !RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(form.email)
        ) {
            setForm({ ...form, error: 'Please enter a valid email' });
            return;
        }

        if (
            RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/).test(form.password) === false
        ) {
            setForm({
                ...form,
                error: 'Incorrect password',
            });
            return;
        }

        try {
            const res = await api.post('/login', form);
            localStorage.setItem('token', res.data.accessToken);
            setUser(res.data.user);
            navigate('/chat');
        } catch (err) {
            setForm({ ...form, error: err.response.data.error });
        }
    };

    return (
        <div className='flex h-full flex-col items-center justify-center gap-2'>
            <h1 className='text-2xl font-semibold'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex w-64 flex-col gap-2'>
                <input
                    type='text'
                    placeholder='Username'
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                    className='rounded-md border-2 border-bg-light bg-bg-regular p-2'
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                    className='rounded-md border-2 border-bg-light bg-bg-regular p-2'
                />
                <button
                    type='submit'
                    className='m-auto w-1/2 rounded-md border-2 border-bg-light bg-bg-regular p-2'
                >
                    Sign In
                </button>
                {form.error && <p className='text-center'>{form.error}</p>}
            </form>
        </div>
    );
}
