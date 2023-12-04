import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../utils/api';

export function Verification() {
    const [params, setParams] = useSearchParams();
    const id = params.get('id'),
        veriCode = params.get('veriCode');

    const [verified, setVerified] = useState(null);

    useEffect(() => {
        if (!id || !veriCode) return;
        const verify = async () => {
            try {
                await api.post('/verify', { id, veriCode });
                setParams({});
                setVerified(true);
            } catch (err) {
                setVerified(false);
                console.log(err);
            }
        };
        verify();
    }, [id, veriCode]);

    if (verified === null)
        return (
            <div className='flex h-full flex-col items-center justify-center gap-8 text-center'>
                <h1 className='pl-6 text-5xl font-semibold'>
                    Verifying
                    <span style={{ animation: 'dot 1.4s infinite 0.2s' }}>
                        .
                    </span>
                    <span style={{ animation: 'dot 1.4s infinite 0.4s' }}>
                        .
                    </span>
                    <span style={{ animation: 'dot 1.4s infinite 0.6s' }}>
                        .
                    </span>
                </h1>
                <p className='text-sm'>
                    Please wait while we verify your account. This shouldn't
                    take long.
                </p>
                <Link to='/chat'>
                    <button
                        tabIndex='-1'
                        className='h-12 w-32 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                    >
                        Go back
                    </button>
                </Link>
            </div>
        );

    if (verified)
        return (
            <div className='flex h-full flex-col items-center justify-center gap-8 text-center'>
                <h1 className='text-5xl font-semibold'>
                    Verification successful!
                </h1>
                <p className='text-sm'>
                    Your account has been verified and 1000 credits has been
                    added to your account!
                </p>
                <a href='http://localhost:5173/chat'>
                    <button
                        tabIndex='-1'
                        className='h-12 w-32 rounded-lg border-2 border-primary-100 bg-primary-100 font-semibold transition-all hover:border-text-100'
                    >
                        Go to chat
                    </button>
                </a>
            </div>
        );

    return (
        <div className='flex h-full flex-col items-center justify-center gap-8 text-center'>
            <h1 className='text-5xl font-semibold'>Verification failed!</h1>
            <p className='text-sm'>
                Unfortunately we couldn't verify your account. Please try again
                later or contact support.
            </p>
            <Link to='/chat'>
                <button
                    tabIndex='-1'
                    className='h-12 w-32 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                >
                    Go back
                </button>
            </Link>
        </div>
    );
}

export default Verification;
