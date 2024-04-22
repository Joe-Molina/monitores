'use client'

import { verificarEstadoActividad } from '@/app/services/verificarActividad'
import React from 'react'

const Card = (publi: any) => {

    publi = publi.publi

    const fechaInicio = publi.fecha_inicio.toLocaleDateString()
    const fechaFin = publi.Fecha_Fin.toLocaleDateString()


    return (
        <div className='shadow-lg flex flex-col justify-between max-w-96 cover rounded-sm overflow-hidden w-72 h-[450px] bg-neutral-800 p-3'>
            <div className='h-56'>
                {
                    (publi.type !== "video") ?
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={'/fotos/' + publi.name} alt="" className='mx-auto h-full' />
                        :
                        <video src={'/fotos/' + publi.name} controls ></video>
                }
            </div>
            <div className=''>
                <p>Nombre: {publi.name}</p>
                <p>duracion: {publi.duration / 1000 + "s"}</p>
                <p>Tipo: {publi.type}</p>
                <p>estado: {verificarEstadoActividad(publi.fecha_inicio, publi.Fecha_Fin) ? 'activo' : 'inactivo'}</p>
                <p>fecha inicio: {fechaInicio}</p>
                <p>fecha inicio: {fechaFin}</p>
            </div>
            <button onClick={() => handleClick(publi.id)} className='bg-red-600 text-white px-3 py-1 rounded-sm m-1 hover:bg-red-700 transition'>Eliminar</button>
        </div>
    )
}


const handleClick = async (id: any) => {
    const res2 = await fetch(`/api/subirInfo/${id}`, {
        method: "DELETE"
    }
    )
    const data2 = await res2.json()
    location.reload()
}

function ImagenesCard(data: any) {

    data = data.data
    console.log(data)

    return (
        <div className='p-3 flex gap-4 justify-stretch flex-wrap overflow-auto text-white'>

            {
                data.map((publi: any, index: any) => (
                    <Card publi={publi} key={index} />
                ))
            }
        </div>
    )
}

export default ImagenesCard