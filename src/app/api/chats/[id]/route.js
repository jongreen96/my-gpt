import { sql } from '@vercel/postgres';

export async function GET(request, { params }) {
  const id = params.id;
  const { rows } = await sql`
    SELECT * FROM messages WHERE conversation_id = ${id}
    `;

  return Response.json(rows);
}
