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

    const sortByPriority = (a: { position: number }, b: { position: number }) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        return 0;
    };

    //@ts-ignore
    const sortedArray = [...ActivePublis].sort(sortByPriority);

    console.log(sortedArray)


    return (
        <div className='bg-black w-screen h-screen' >

            {ActivePublis.length > 0 && <Imga data={sortedArray} />}
            {ActivePublis.length === 0 && <NoImage />}

        </div>
    )
}

export default Vista