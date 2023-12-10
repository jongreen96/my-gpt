import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import TextAreaAutoSize from 'react-textarea-autosize';
import { Send } from '../assets/Icons';

export default function Chat() {
    const navigate = useNavigate();
    const [user, setUser] = useOutletContext();

    const [input, setInput] = useState('');

    useEffect(() => {
        if (!user) navigate('/');
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;
        console.log(input);
        setInput('');
    };

    return (
        <div className='flex h-full w-full flex-col-reverse'>
            <form className='flex gap-2 p-2'>
                <TextAreaAutoSize
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            handleSubmit(e);
                        }
                    }}
                    autoFocus
                    maxRows={15}
                    className='no-scrollbar w-full resize-none rounded-md border-2 border-bg-light bg-bg-regular p-2'
                />
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='mb-2 w-7 self-end'
                >
                    <Send />
                </button>
            </form>
        </div>
    );
}
