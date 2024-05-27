import Image from "next/image";
import { FormCard } from '../components/dataFrom'
import { PublisCollection } from "@/components/PublisCollection";
import { prisma } from '../libs/prisma'
import { loginIsRequiredServer } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Marquee from "@/components/Marquee";


export default async function Home() {

  const publicidades = await prisma.publicidad.findMany()

  const session = await loginIsRequiredServer();

  //@ts-ignore
  const userId = session.user.id

  return (
    <main id="app" className="relative max-h-screen h-screen p-2 gap-2">
      <aside className="[grid-area:aside] flex-col flex overflow-y-auto rounded-lg bg-neutral-900 text-white">
        <FormCard
          //@ts-ignore
          data={publicidades} user={session.user} />
        <div className='flex w-full px-5 py-5'>
          <Link href='/auditoria' className='w-full'><Button className='w-full'>Registro de Actividades</Button></Link>
        </div>
      </aside>
      <main className="[grid-area:main] rounded-lg bg-neutral-900 overflow-auto">
        <Marquee publicidades={publicidades} session={session} />
      </main>
    </main>

  );
}

