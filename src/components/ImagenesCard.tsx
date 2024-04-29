'use client'

import { verificarEstadoActividad } from '@/app/services/verificarActividad'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Divide } from 'lucide-react'
import React from 'react'

const Card = (publi: any) => {

    publi = publi.publi

    const fechaInicio = publi.fecha_inicio.toLocaleDateString()
    const fechaFin = publi.Fecha_Fin.toLocaleDateString()


    return (
        <div className='shadow-lg flex flex-col justify-between max-w-96 cover rounded-sm overflow-hidden w-72  bg-neutral-800  border border-neutral-600'>
            <div className='h-56 bg-black overflow-hidden flex'>
                {
                    (publi.type !== "video") ?
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={'/fotos/' + publi.name} alt="" className='mx-auto h-full' />
                        :
                        <video src={'/fotos/' + publi.name} controls ></video>
                }
            </div>
            <div className='mt-2 p-3'>
                <p className='p-1 bg-neutral-950/75 rounded-sm px-2  border border-neutral-600'>{publi.name}</p>
                <div className='flex my-1'>
                    <div className='flex gap-2 items-center'>
                        <p className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'>{publi.duration / 1000 + "s"}</p>
                        {publi.type == 'img' ? <div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><img src='/iconos/img.svg' className='h-5 w-5'></img></div> : <div className='bg-neutral-900/70 border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><img src='/iconos/video.svg' className='h-5 w-5'></img></div>}
                        {verificarEstadoActividad(publi.fecha_inicio, publi.Fecha_Fin) ? <Switch checked={true} id="airplane-mode" className='border border-green-800 bg-green-400' /> : <Switch checked={false} id="airplane-mode" className='border border-red-800' />}
                    </div>
                    <div className='w-full flex justify-end gap-1 items-center'>
                        <button onClick={() => handleClick(publi.id)} ><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm hover:bg-neutral-600/10 hover:scale-105 transition'><img src='/iconos/update.svg' className='h-5 w-5'></img></div></button>
                        <button onClick={() => handleClick(publi.id)} ><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm hover:bg-red-600/10 hover:scale-105 transition'><img src='/iconos/delete.svg' className='h-5 w-5'></img></div></button>
                    </div>
                </div>
                <div className='flex gap-3 justify-between'>
                    <div className='flex items-center gap-1 text-sm font-medium'> <div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><img src='/iconos/up.svg' className='h-5 w-5'></img></div>{fechaInicio} </div>
                    <div className='flex items-center gap-1 text-sm font-medium'> <div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm '><img src='/iconos/down.svg' className='h-5 w-5'></img></div>{fechaFin}</div>
                </div>
            </div>
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