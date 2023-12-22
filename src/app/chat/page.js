import { auth } from '@/auth';

export default async function Chat() {
  const session = await auth();
  return null;
}
