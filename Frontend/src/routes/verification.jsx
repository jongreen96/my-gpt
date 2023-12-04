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
            <div className='flex h-full flex-col items-center justify-center gap-8'>
                <h1 className='text-5xl font-semibold'>Verifying...</h1>
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
            <div className='flex h-full flex-col items-center justify-center gap-8'>
                <h1 className='text-5xl font-semibold'>
                    Verification successful!
                </h1>
                <Link to='/chat'>
                    <button
                        tabIndex='-1'
                        className='h-12 w-32 rounded-lg border-2 border-primary-100 bg-primary-100 font-semibold transition-all hover:border-text-100'
                    >
                        Go to chat
                    </button>
                </Link>
            </div>
        );
    return (
        <div className='flex h-full flex-col items-center justify-center gap-8'>
            <h1 className='text-5xl font-semibold'>Verification failed!</h1>
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
