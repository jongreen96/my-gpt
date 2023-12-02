import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function Chat() {
    const navigate = useNavigate();
    const [user, setUser] = useOutletContext();

    useEffect(() => {
        if (!user) navigate('/');
    }, [user]);

    return (
        <div className='flex h-[100dvh] flex-col gap-8 pt-14 sm:pt-0'>
            <h1>Chat</h1>
        </div>
    );
}
