import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI();

export const runtime = 'edge';

export async function POST(req) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  });

  const stream = new OpenAIStream(response, {
    onCompletion: async (completion) => {
      // TODO: Save the chat to the database
    },
  });
  return new StreamingTextResponse(stream);
}
