import { Form } from './inicio/components/Form'
import { prisma } from '../libs/prisma'
import { loginIsRequiredServer } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Marquee from "./inicio/components/Marquee";
import { FormProvider } from "./inicio/context/FormProvider";
import { PostsProvider } from './inicio/context/PostProvider';

export default async function Home() {

  const publicidades = await prisma.publicidad.findMany()

  const session = await loginIsRequiredServer();

  return (
        <PostsProvider>
        <FormProvider>
    <main id="app" className="relative max-h-screen h-screen p-2 gap-2">
      <aside className="[grid-area:aside] flex-col flex overflow-y-auto rounded-lg bg-neutral-900 text-white">
        <Form
          //@ts-ignore
          data={publicidades} user={session.user} />
        <div className='flex w-full px-5 py-5'>
          <Link href='/auditoria' className='w-full'><Button className='w-full'>Registro de Actividades</Button></Link>
        </div>
      </aside>
      <main className="[grid-area:main] rounded-lg bg-neutral-900 overflow-auto">
        <Marquee session={session} />
      </main>
    </main>
          </FormProvider>
          </PostsProvider>
  );
}

