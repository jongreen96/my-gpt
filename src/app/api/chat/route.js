import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { sql } from '@vercel/postgres';

const openai = new OpenAI();

export const runtime = 'edge';

export async function POST(req) {
  const { messages, id, userId } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true,
  });

  const stream = new OpenAIStream(response, {
    onStart: async () => {
      await sql`
          INSERT INTO conversations (id, model, user_id, subject)
          VALUES (${id}, 'gpt-3.5-turbo', ${userId}, ${id})
          ON CONFLICT (id) DO NOTHING;
        `;
      await sql`
          INSERT INTO messages (conversation_id, content, role, credits)
          VALUES (${id}, ${messages[messages.length - 1].content}, 'user', 1)
        `;
    },
    onCompletion: async (completion) => {
      await sql`
        INSERT INTO messages (conversation_id, content, role, credits)
        VALUES (${id}, ${completion}, 'assistant', 1)
      `;
    },
  });
  return new StreamingTextResponse(stream);
}
