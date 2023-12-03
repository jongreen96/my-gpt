import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function Chat() {
    const navigate = useNavigate();
    const [user, setUser] = useOutletContext();

    useEffect(() => {
        if (!user) navigate('/');
    }, [user]);

    return (
        <div className='flex flex-col gap-8'>
            <h1>Chat</h1>
        </div>
    );
}
