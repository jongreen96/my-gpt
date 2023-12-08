import { Link } from 'react-router-dom';
import { MessageRegular, MessageSolid } from '../assets/Icons';

export default function ConversationMenu() {
    return (
        <div className='flex w-full flex-col gap-2 p-2 md:group-hover:w-64'>
            <Link to='/chat'>
                <button
                    tabIndex='-1'
                    className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-100 bg-primary-100 font-semibold transition-all hover:border-text-100'
                >
                    <MessageSolid />
                    <p className='hidden group-hover:block'>New Chat</p>
                </button>
            </Link>

            {/* TEST BUTTONS */}
            {new Array(1).fill(0).map((_, i) => {
                return (
                    <Link
                        to={`/chat/${i}`}
                        key={i}
                        style={{ scrollSnapAlign: 'start' }}
                    >
                        <button
                            tabIndex='-1'
                            className='flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-bg-light bg-bg-light font-semibold transition-all hover:border-text-100'
                        >
                            <MessageRegular />
                            <p className='hidden group-hover:block'>Chat {i}</p>
                        </button>
                    </Link>
                );
            })}
        </div>
    );
}
