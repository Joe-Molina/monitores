'use client'

import { verificarEstadoActividad } from '@/app/services/verificarActividad'
import { Switch } from "@/components/ui/switch"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import Image from 'next/image'
import { updateEndTime, updateInitialTime } from '@/services/pulTime'
import { deletePubli } from '@/services/deletePubli'
import { useState } from 'react'

export const PubliCard = ({ publi }: any) => {
    const fechaInicio = publi.fecha_inicio.toLocaleDateString()
    const fechaFin = publi.Fecha_Fin.toLocaleDateString()

    let [positionn, setPositionn] = useState(0)

    return (
        <div className='shadow-lg flex flex-col justify-between max-w-96 cover rounded-sm overflow-hidden w-72  bg-neutral-800  border border-neutral-600'>
            <div className='relative h-56 mx-auto bg-black overflow-hidden flex'>
                {
                    (publi.type !== "video") ?
                        <div className='relative h-56 w-40 mx-auto bg-black overflow-hidden flex'>
                            <Image src={'/fotos/' + publi.name} alt="" className='mx-auto h-full' fill />
                        </div>
                        :
                        <video src={'/fotos/' + publi.name} controls ></video>
                }
            </div>
            <div className='p-1'>
                <p className='p-1 bg-neutral-950/75 rounded-sm px-2  border border-neutral-600'>{publi.name}</p>
                <div className='flex my-1'>
                    <div className='flex gap-2 items-center'>
                        <Popover>
                            <PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-10 h-7 flex justify-center items-center rounded-sm'>{publi.position + ".º"}</div></PopoverTrigger>
                            <PopoverContent className='w-20'>
                                <form className='w-10' onSubmit={async (e) => {
                                    e.preventDefault()

                                    const res = await fetch(`/api/subirInfo/${publi.id}`, {
                                        method: "PUT",
                                        body: JSON.stringify({ position: positionn }),
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });

                                    const datos = await res.json();
                                    if (datos) {
                                        location.reload()
                                    }

                                }}>
                                    <input type="Number" className='w-10' required onChange={(e) => { const number = Number(e.target.value); setPositionn(number) }} />
                                    <input type="submit" value="" className='hidden' />
                                </form>
                            </PopoverContent>
                        </Popover>
                        <p className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'>{publi.duration / 1000 + "s"}</p>
                        {publi.type == 'img' ? <div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/img.svg' alt='' width={20} height={20} /></div> : <div className='bg-neutral-900/70 border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/video.svg' alt='' width={20} height={20} /></div>}
                        {verificarEstadoActividad(publi.fecha_inicio, publi.Fecha_Fin) ? <Switch checked={true} id="airplane-mode" className='border border-green-800 bg-green-400' /> : <Switch checked={false} id="airplane-mode" className='border border-red-800' />}
                    </div>
                    <div className='w-full flex justify-end gap-1 items-center'>
                        <button onClick={() => deletePubli(publi.id)} ><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm hover:bg-red-600/10 hover:scale-105 transition'><Image src='/iconos/delete.svg' alt='' width={20} height={20} /></div></button>
                    </div>
                </div>
                <div className='flex gap-3 justify-between'>
                    <Popover>
                        <div className='flex items-center gap-1 text-sm font-medium'> <PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/up.svg' alt='' width={20} height={20} /></div></PopoverTrigger>{fechaInicio} </div>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                // selected={date}
                                onSelect={(e) => { updateInitialTime(e, publi.id) }}
                                className="rounded-md flex justify-center border"
                            />
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <div className='flex items-center gap-1 text-sm font-medium'>{fechaFin}<PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm '><Image src='/iconos/down.svg' alt='' width={20} height={20} /></div></PopoverTrigger></div>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                // selected={date}
                                onSelect={(e) => { updateEndTime(e, publi.id) }}
                                className="rounded-md flex justify-center border"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div >
    )
}