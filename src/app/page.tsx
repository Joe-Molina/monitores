import Image from "next/image";
import { FormCard } from '../components/dataFrom'
import { PublisCollection } from "@/components/PublisCollection";
import { prisma } from '../libs/prisma'
import { loginIsRequiredServer } from "./api/auth/[...nextauth]/route";


export default async function Home() {

  const publicidades = await prisma.publicidad.findMany()

  const session = await loginIsRequiredServer();

  //@ts-ignore
  const userId = session.user.id


  const InicioDeSesion = await prisma.auditoria.create({
    data: {
      id_usuario: Number(userId),
      accion: 'inicio de sesion',
      descripcion: 'pantalla de inicio'
    }
  })



  console.log(InicioDeSesion)


  return (
    <main id="app" className="relative max-h-screen h-screen p-2 gap-2">
      <aside className="[grid-area:aside] flex-col flex overflow-y-auto rounded-lg bg-neutral-900 text-white">
        <FormCard
          //@ts-ignore
          data={publicidades} user={session.user} />
      </aside>
      <main className="[grid-area:main] rounded-lg bg-neutral-900 overflow-auto">
        <PublisCollection
          //@ts-ignore
          data={publicidades} userId={session.user.id} />
      </main>
    </main>

  );
}

