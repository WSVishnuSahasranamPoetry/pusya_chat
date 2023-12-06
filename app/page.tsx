import Image from 'next/image'
import { MainLoginButton } from './components/Buttons'
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {

  const session = await getServerSession(authOptions);

  if(session) {
    redirect("/chat");
  };

  return (
    <main className="flex flex-col items-center p-24">
      <h1 className='text-xl lg:text-3xl font-semibold text-center'>Войдите, что бы использовать чат.</h1>

      <div className='mt-8'>
        <MainLoginButton />
      </div>
    </main>
  )
}
