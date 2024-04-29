import Image from "next/image";
import { FormCard } from '../components/dataFrom'
import ImagenesCard from "@/components/ImagenesCard";
import { prisma } from '../libs/prisma'


export default async function Home() {

  const publicidades = await prisma.publicidad.findMany()


  return (
    <main id="app" className="relative max-h-screen h-screen p-2 gap-2">
      <aside className="[grid-area:aside] flex-col flex overflow-y-auto rounded-lg bg-neutral-900 text-white">
        <FormCard
          //@ts-ignore
          data={publicidades} />
      </aside>
      <main className="[grid-area:main] rounded-lg bg-neutral-900 overflow-auto">
        <ImagenesCard
          //@ts-ignore
          data={publicidades} />
      </main>
    </main>

  );
}

