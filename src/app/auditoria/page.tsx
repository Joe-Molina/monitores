import { prisma } from '../../libs/prisma'
import { loginIsRequiredServer } from ".././api/auth/[...nextauth]/route";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Historial from "./components/historial";


export default async function Home() {

    const data = await prisma.auditoria.findMany({
        orderBy: {
            id: 'desc' // 'desc' for descending order
        }
    })

    const session = await loginIsRequiredServer();

    //@ts-ignore
    const userId = session.user.id

    return (
        <main id="app" className="relative max-h-screen h-screen p-2 gap-2 dark">
            <aside className="[grid-area:aside] flex-col flex overflow-y-auto rounded-lg bg-neutral-900 text-white">

                <div className='flex w-full px-5 py-5'>
                    <Link href='/' className='w-full'><Button className='w-full'>Regresar subir archivos</Button></Link>
                </div>
            </aside>
            <main className="[grid-area:main] rounded-lg bg-neutral-900 overflow-auto">
                <Historial data={data} />
            </main>
        </main>

    );
}