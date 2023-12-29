'use client';

import TextAreaAutoSize from 'react-textarea-autosize';
import Image from 'next/image';

import Send from '@/../public/send.svg';

export default function ChatInput() {
  return (
    <form className='mt-auto flex gap-2'>
      <TextAreaAutoSize
        autoFocus
        maxRows={15}
        className='h-11 w-full resize-none rounded-md border-2 border-gray-200 bg-gray-200 p-2'
      />
      <button type='submit' className='mb-2 self-end'>
        <Image src={Send} alt='Send' width={30} height={30} />
      </button>
    </form>
  );
}
