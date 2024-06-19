'use client'

import { verificarEstadoActividad } from '@/app/inicio/services/verificarActividad'
import { Switch } from "@/components/ui/switch"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { updateEndTime, updateInitialTime } from '@/services/pulTime'
import { deletePubli } from '@/services/deletePubli'
import { useState } from 'react'
import Image from 'next/image'

export const BannersCard = ({ publi, user }: any) => {
    const fechaInicio = publi.fecha_inicio.toLocaleDateString()
    const fechaFin = publi.Fecha_Fin.toLocaleDateString()

    let [positionn, setPositionn] = useState(0)
    let [duration, setDuration] = useState(0)

    return (
        <div className='shadow-lg flex flex-col justify-between  cover rounded-sm overflow-hidden w-[500px]  bg-neutral-800  border border-neutral-600'>
            <div className='p-1 '>
                <div className='px-1 bg-neutral-950/75 rounded-sm border border-neutral-600 marquee'><p>{publi.name}</p></div>
                <div className='flex my-1'>
                    <div className='flex gap-2 items-center'>
                        <Popover>
                            <PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-10 h-7 flex justify-center items-center rounded-sm'>{publi.position > 0?(publi.position - 100) + ".º": '-'}</div></PopoverTrigger>
                            <PopoverContent className='w-20'>
                                <form className='w-10' onSubmit={async (e) => {
                                    e.preventDefault()

                                    

                                  await fetch('/api/auditoria', {
                                        method: "POST",
                                        body: JSON.stringify({
                                            id_usuario: Number(user.id),
                                            accion: user.name,
                                            descripcion: `se cambio de posicion archivo ${publi.name} de ${publi.position} a ${positionn}`,
                                            tipo: "cambio de posicion"
                                        }
                                        ),
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    })



                                    const res = await fetch(`/api/subirInfo/${publi.id}`, {
                                        method: "PUT",
                                        body: JSON.stringify({ position: positionn + 100 }),
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
                        <Popover>
                            <PopoverTrigger><p className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'>{publi.duration / 1000 + "s"}</p></PopoverTrigger>
                            <PopoverContent className='w-20'>
                                <form className='w-10' onSubmit={async (e) => {
                                    e.preventDefault()


                                    await fetch('/api/auditoria', {
                                        method: "POST",
                                        body: JSON.stringify({
                                            id_usuario: Number(user.id),
                                            accion: user.name,
                                            descripcion: `cambio de duracion al archivo ${publi.name} de ${publi.duration / 1000} segundos a ${duration / 1000} segundos`,
                                            tipo: "cambio de duracion"
                                        }
                                        ),
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    })

                                    const res = await fetch(`/api/subirInfo/${publi.id}`, {
                                        method: "PUT",
                                        body: JSON.stringify({ duration: duration }),
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });

                                    const datos = await res.json();
                                    if (datos) {
                                        location.reload()
                                    }

                                }}>
                                    <input type="Number" className='w-10' min="1" required onChange={(e) => { const number = Number(e.target.value); setDuration(number * 1000) }} />
                                    <input type="submit" value="" className='hidden' />
                                </form>
                            </PopoverContent>
                        </Popover>

                        {publi.type == 'img' ? <div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/img.svg' alt='' width={20} height={20} /></div> : <div className='bg-neutral-900/70 border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/video.svg' alt='' width={20} height={20} /></div>}
                        {verificarEstadoActividad(publi.fecha_inicio, publi.Fecha_Fin) ? <Switch checked={true} id="airplane-mode" className='border border-green-800 bg-green-400' /> : <Switch checked={false} id="airplane-mode" className='border border-red-800' />}
                    </div>
                    <div className='w-full flex justify-end gap-1 items-center'>
                        <button onClick={() => deletePubli(publi.id, user, publi)} ><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm hover:bg-red-600/10 hover:scale-105 transition'><Image src='/iconos/delete.svg' alt='' width={20} height={20} /></div></button>
                    </div>
                </div>
                <div className='flex gap-3 justify-between'>
                    <Popover>
                        <div className='flex items-center gap-1 text-sm font-medium'> <PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/up.svg' alt='' width={20} height={20} /></div></PopoverTrigger>{fechaInicio} </div>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                // selected={date}
                                onSelect={(e) => { updateInitialTime(e, publi.id, user, fechaInicio, publi.name) }}
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
                                onSelect={(e) => { updateEndTime(e, publi.id, user, fechaFin, publi.name) }}
                                className="rounded-md flex justify-center border"
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div >
    )
}