import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { usePostsContext } from '@/app/inicio/hooks/usePosts'
import { updateEndTime, updateInitialTime } from '../../../../services/pulTime'
import Image from 'next/image'



export default function Dates({ fechaInicio, fechaFin }: any) {

    console.log(typeof (fechaFin))
    console.log(typeof (fechaInicio))

    const fin = typeof (fechaFin) === "string" ? fechaFin.slice(0, 10) : fechaFin.toISOString().slice(0, 10)
    const start = typeof (fechaInicio) === "string" ? fechaInicio.slice(0, 10) : fechaInicio.toISOString().slice(0, 10)


    return (
        <div className='flex justify-around border-t items-center '>

            <div className='flex items-center gap-1 text-sm font-medium '><Image src='/iconos/up.svg' alt='' width={20} height={20} />{start}</div>
            {/* end time  */}
            <div className='flex items-center text-sm font-medium justify-center gap-1'>{fin}<Image src='/iconos/down.svg' alt='' width={20} height={20} /></div>

        </div>
    )
}
