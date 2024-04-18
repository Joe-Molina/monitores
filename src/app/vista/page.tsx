import React from 'react'
import Imga from './Imagen'
import { prisma } from '../../libs/prisma'

async function Vista() {

    const publicidades = await prisma.publicidad.findMany()

    return (
        <div className='bg-black w-screen h-screen' >
            <Imga
                //@ts-ignore
                data={publicidades} />
        </div>
    )
}

export default Vista