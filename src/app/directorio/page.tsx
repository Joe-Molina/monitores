import React from 'react'
import fs from 'fs'
import path from 'path'
import { archivos } from './services/archivosEnCarpeta'
import { fotosBd } from './services/ArchivosEnBd'



async function page() {
    console.log(archivos)
    console.log('bd')
    console.log(await fotosBd)

    return (
        <main id="app" className="relative max-h-screen h-screen p-2 gap-2 bg-neutral-0">
            <aside className="[grid-area:aside] flex-col flex overflow-y-auto rounded-lg bg-neutral-900 text-white">

            </aside>
            <main className="[grid-area:main] rounded-lg bg-neutral-800 overflow-auto">

            </main>
        </main>
    )
}

export default page