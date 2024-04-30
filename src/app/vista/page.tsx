'use client'

import React, { useEffect, useState } from 'react'
import Imga from './Imagen'
import { verificarEstadoActividad } from '../services/verificarActividad'
import Image from 'next/image'

function Vista() {
    //@ts-ignore
    const [publis, setPublis] = useState([]);

    useEffect(() => {
        fetch('/api/subirInfo')
            .then(res => res.json())
            .then(data => setPublis(data))

    }, []); // Empty dependency array: Fetch data once on component mount and start the interval


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