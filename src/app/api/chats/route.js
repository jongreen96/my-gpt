import { sql } from '@vercel/postgres';
import { headers } from 'next/headers';

export async function GET() {
  const headersList = headers();
  const id = headersList.get('Authorization');
  const { rows } = await sql`
    SELECT * FROM conversations WHERE user_id = ${id}
    `;

  return Response.json(rows);
}
