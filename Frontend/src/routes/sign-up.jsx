import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useOutletContext();
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password || !form.confirmPassword) {
            setForm({ ...form, error: 'Please fill out all fields' });
            return;
        }

        if (
            !RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(form.email)
        ) {
            setForm({ ...form, error: 'Please enter a valid email' });
            return;
        }

        if (form.password !== form.confirmPassword) {
            setForm({ ...form, error: 'Passwords do not match' });
            return;
        }

        if (!RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/).test(form.password)) {
            setForm({
                ...form,
                error: 'Password must be at least 8 characters long and contain at least one number',
            });
            return;
        }

        try {
            const res = await api.post('/register', form);
            localStorage.setItem('token', res.data.accessToken);
            setUser(res.data.user);
            navigate('/chat');
        } catch (err) {
            setForm({ ...form, error: err.response.data.error });
        }
    };

    return (
        <div className='flex h-full flex-col items-center justify-center gap-2'>
            <h1 className='text-2xl font-semibold'>Sign Up</h1>
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
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={form.confirmPassword}
                    onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                    }
                    className='rounded-md border-2 border-bg-light bg-bg-regular p-2'
                />
                <button
                    type='submit'
                    className='m-auto w-1/2 rounded-md border-2 border-bg-light bg-bg-regular p-2'
                >
                    Sign Up
                </button>
                {form.error && <p className='text-center'>{form.error}</p>}
            </form>
        </div>
    );
}
