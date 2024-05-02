import React, { useEffect, useState } from 'react'
import Imga from './Imagen'
import { verificarEstadoActividad } from '../services/verificarActividad'
import Image from 'next/image'
import { prisma } from '../../libs/prisma'
import NoImage from './NoImage'

async function Vista() {

    const publis = await prisma.publicidad.findMany()

    //@ts-ignore
    const ActivePublis = publis.filter(publi => verificarEstadoActividad((publi.fecha_inicio), publi.Fecha_Fin) === true)

    console.log(ActivePublis)


    return (
        <div className='bg-black w-screen h-screen' >

            {ActivePublis.length > 0 && <Imga data={ActivePublis} />}
            {ActivePublis.length === 0 && <NoImage />}

        </div>
    )
}

export default Vista