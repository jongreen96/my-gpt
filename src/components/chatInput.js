'use client';

import TextAreaAutoSize from 'react-textarea-autosize';
import Image from 'next/image';

import Send from '@/../public/send.svg';

export default function ChatInput({ input, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className='flex gap-2 p-2'>
      <TextAreaAutoSize
        autoFocus
        maxRows={15}
        value={input}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        className='h-11 w-full resize-none rounded-md border-2 border-gray-200 bg-gray-200 p-2'
      />
      <button type='submit' className='mb-2 self-end'>
        <Image src={Send} alt='Send' width={30} height={30} />
      </button>
    </form>
  );
}
