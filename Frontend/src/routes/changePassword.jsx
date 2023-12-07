import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export default function ChangePassword() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        error: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !form.oldPassword ||
            !form.newPassword ||
            !form.confirmNewPassword
        ) {
            setForm({ ...form, error: 'Please fill out all fields' });
            return;
        }

        if (form.newPassword !== form.confirmNewPassword) {
            setForm({ ...form, error: 'New passwords do not match' });
            return;
        }

        if (!RegExp(/^(?=.*[A-Z])(?=.*\d).{8,}$/).test(form.newPassword)) {
            setForm({
                ...form,
                error: 'Password must be at least 8 characters long and contain at least one number',
            });
            return;
        }

        try {
            const res = await api.patch('/user', {
                oldPassword: form.oldPassword,
                newPassword: form.newPassword,
            });
            if (res.status !== 200) throw new Error(res);

            navigate('/settings');
        } catch (err) {
            setForm({ ...form, error: err.response.data.error });
        }
    };

    return (
        <div className='flex h-full flex-col items-center justify-center gap-2'>
            <h1 className='text-2xl font-semibold'>Change Password</h1>
            <form onSubmit={handleSubmit} className='flex w-64 flex-col gap-2'>
                <input
                    type='password'
                    placeholder='Old password'
                    value={form.oldPassword}
                    onChange={(e) =>
                        setForm({ ...form, oldPassword: e.target.value })
                    }
                    className='rounded-md border-2 border-bg-light bg-bg-regular p-2'
                />
                <input
                    type='password'
                    placeholder='New password'
                    value={form.newPassword}
                    onChange={(e) =>
                        setForm({ ...form, newPassword: e.target.value })
                    }
                    className='rounded-md border-2 border-bg-light bg-bg-regular p-2'
                />
                <input
                    type='password'
                    placeholder='Confirm new password'
                    value={form.confirmNewPassword}
                    onChange={(e) =>
                        setForm({ ...form, confirmNewPassword: e.target.value })
                    }
                    className='rounded-md border-2 border-bg-light bg-bg-regular p-2'
                />
                <button
                    type='submit'
                    className='m-auto w-1/2 rounded-md border-2 border-bg-light bg-bg-regular p-2'
                >
                    Save
                </button>
                {form.error && <p className='text-center'>{form.error}</p>}
            </form>
        </div>
    );
}
