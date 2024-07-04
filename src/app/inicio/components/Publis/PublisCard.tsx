'use client'
import React, { useRef } from 'react';
import { verificarEstadoActividad } from '@/app/inicio/services/verificarActividad'
import { Switch } from "@/components/ui/switch"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import Image from 'next/image'
import { updateEndTime, updateInitialTime } from '@/services/pulTime'
import { deletePubli } from '@/services/deletePubli'
import { useState } from 'react'
import { usePostsContext } from '../../hooks/usePosts'
import { toast } from 'sonner'
import Dates from './PublisCard/components/Dates'
import { postDuration, postPosition } from './PublisCard/services/postInfo';
import ImgOrVideo from './PublisCard/components/ImgOrVideo';
import EditPopover from './PublisCard/components/EditPopover';

export const PubliCard = ({ publi, user }: any) => {
    const {deletePost,setDuration, setPosition} = usePostsContext()

    const handleClickDetele = async() => {

        const date = new Date
        
        const datos = await deletePubli(publi.id, user, publi)
        if (datos) {
            deletePost(publi.id);
            toast(`${publi.name} ha sido borrado`, {
                description: date.toLocaleString()
              })
            } 

    }

    const handleClickEdit = () => {
        postPosition(publi, position, setPosition)
        postDuration(publi, duration, setDuration) 
    }

    let [position, setPositionn] = useState(0)
    let [duration, setDurationn] = useState(0)
    return (
        <div className='shadow-lg flex flex-col justify-between max-w-96 cover rounded-sm overflow-hidden w-72  bg-neutral-900  border border-neutral-600'>
                <ImgOrVideo publi={publi}/>
           
                <p className='p-1 bg-neutral-950/75  px-2  border-y border-neutral-600'>{publi.name}</p>


            <div className='p-1'>
                <div className='flex my-1'>
                    <div className='flex gap-2 items-center'>
                        {/* position */}
                        <div  className='bg-neutral-900/70  border border-neutral-700 w-10 h-7 flex justify-center items-center rounded-sm'>{publi.position > 0? publi.position + ".º": '-'}</div>
                        
                        {/* duration  */}
                        <p className='bg-neutral-900/70  border border-neutral-700 w-9 h-7 flex justify-center items-center rounded-sm'>{publi.duration / 1000 + "s"}</p>

                        {/* ico img/video  */}
                        {publi.type == 'img' ? <div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/img.svg' alt='' width={20} height={20} /></div> : <div className='bg-neutral-900/70 border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/video.svg' alt='' width={20} height={20} /></div>}

                        {/* activity status */}
                        {verificarEstadoActividad(publi.fecha_inicio, publi.Fecha_Fin) ? <Switch checked={true} id="airplane-mode" className='border border-green-800 bg-green-400' /> : <Switch checked={false} id="airplane-mode" className='border border-red-800' />}
                    </div>
                    {/* delete publi  */}
                    <div className='w-full flex justify-end gap-1 items-center'>
                        <EditPopover/>
                        <button  className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm hover:bg-red-600/10 transition' onClick={()=> {handleClickDetele(); }} ><Image src='/iconos/delete.svg' alt='' width={20} height={20} /></button>
                    </div>
                </div>
                    <Dates id={publi.id} user={user} name={publi.name} fechaInicio={publi.fecha_inicio} fechaFin={publi.Fecha_Fin}/>
            </div>
        </div >
    )
}