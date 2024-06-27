'use client'

import { verificarEstadoActividad } from '@/app/inicio/services/verificarActividad'
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
import { usePostsContext } from '../hooks/usePosts'

export const PubliCard = ({ publi, user }: any) => {
    const {deletePost} = usePostsContext()

    const handleClickDetele = async() => {
        
       const datos = await deletePubli(publi.id, user, publi)
            if (datos) {
                deletePost(publi.id);
            } 
    }


    const fechaInicio = typeof(publi.fecha_inicio) == 'string'? publi.fecha_inicio: publi.fecha_inicio.toString()
    const fechaFin = typeof(publi.Fecha_Fin) == 'string'? publi.Fecha_Fin: publi.Fecha_Fin.toString()

    // .toLocaleDateString()

    let [positionn, setPositionn] = useState(0)
    let [duration, setDuration] = useState(0)
    return (
        <div className='shadow-lg flex flex-col justify-between max-w-96 cover rounded-sm overflow-hidden w-72  bg-neutral-800  border border-neutral-600'>
            <div className='relative h-56 mx-auto bg-black overflow-hidden flex'>
                {
                    (publi.type !== "video") ?
                        <div className='relative h-56 w-40 mx-auto bg-black overflow-hidden flex'>
                            <a href={'/fotos/' + publi.name} target='_blank'>
                                <Image src={'/fotos/' + publi.name} alt="" className='mx-auto h-full' fill />
                            </a>
                        </div>
                        :
                        <video src={'/fotos/' + publi.name} controls ></video>
                }
            </div>
            <div className='p-1'>
                <p className='p-1 bg-neutral-950/75 rounded-sm px-2  border border-neutral-600'>{publi.name}</p>
                <div className='flex my-1'>
                    <div className='flex gap-2 items-center'>
                        {/* position */}
                        <Popover>
                            <PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-10 h-7 flex justify-center items-center rounded-sm'>{publi.position > 0? publi.position + ".º": '-'}</div></PopoverTrigger>
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

                        {/* duration  */}
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
                                        // location.reload()
                                    }

                                }}>
                                    <input type="Number" className='w-10' min="1" required onChange={(e) => { const number = Number(e.target.value); setDuration(number * 1000) }} />
                                    <input type="submit" value="" className='hidden' />
                                </form>
                            </PopoverContent>
                        </Popover>

                        {/* ico img/video  */}
                        {publi.type == 'img' ? <div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/img.svg' alt='' width={20} height={20} /></div> : <div className='bg-neutral-900/70 border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/video.svg' alt='' width={20} height={20} /></div>}

                        {/* activity status */}
                        {verificarEstadoActividad(publi.fecha_inicio, publi.Fecha_Fin) ? <Switch checked={true} id="airplane-mode" className='border border-green-800 bg-green-400' /> : <Switch checked={false} id="airplane-mode" className='border border-red-800' />}
                    </div>
                    {/* delete publi  */}
                    <div className='w-full flex justify-end gap-1 items-center'>
                        <button onClick={()=> {handleClickDetele()}} ><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm hover:bg-red-600/10 hover:scale-105 transition'><Image src='/iconos/delete.svg' alt='' width={20} height={20} /></div></button>
                    </div>
                </div>
                <div className='flex gap-3 justify-between'>
                    {/* inicial time  */}
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
                    
                    {/* end time  */}
                    <Popover>
                        <div className='flex items-center gap-1 text-sm font-medium'><PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm '><Image src='/iconos/down.svg' alt='' width={20} height={20} /></div></PopoverTrigger>{fechaFin}</div>
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