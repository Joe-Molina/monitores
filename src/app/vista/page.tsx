import React, { useEffect, useState } from 'react'
import Imga from './Imagen'
import { verificarEstadoActividad } from '../services/verificarActividad'
import Image from 'next/image'
import { prisma } from '../../libs/prisma'

async function Vista() {

    const publis = await prisma.publicidad.findMany()

    //@ts-ignore
    const ActivePublis = publis.filter(publi => verificarEstadoActividad((publi.fecha_inicio), publi.Fecha_Fin) === true)

    console.log(ActivePublis)


    return (
        <div className='bg-black w-screen h-screen' >

            {ActivePublis.length > 0 && <Imga data={ActivePublis} />}
            {ActivePublis.length === 0 && <div className='relative max-w-[800px] h-full mx-auto'><Image src='/iconos/update.svg' layout='fill' alt='gotito' /></div>}

        </div>
    )
}

export default Vista