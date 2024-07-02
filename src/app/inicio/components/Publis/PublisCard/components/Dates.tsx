import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { usePostsContext } from '@/app/inicio/hooks/usePosts'
import { updateEndTime, updateInitialTime } from '../../../../../../services/pulTime'
import Image from 'next/image'



export default function Dates({id, user, name, fechaInicio, fechaFin }: any) {

    const {setStartDate, setEndDate} = usePostsContext()

   const fin =  typeof(fechaFin) === "string"? fechaFin.slice(0, 10): fechaFin.toISOString().slice(0, 10)
   const start =  typeof(fechaInicio) === "string"? fechaInicio.slice(0, 10): fechaInicio.toISOString().slice(0, 10)


  return (
    <div className='flex gap-3 justify-between'>
    <Popover>
        <div className='flex items-center gap-1 text-sm font-medium'> <PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/up.svg' alt='' width={20} height={20} /></div></PopoverTrigger>{start} </div>
        <PopoverContent>
            <Calendar
                mode="single"
                // selected={date}
                onSelect={(e) => { updateInitialTime(e, id, user, fechaInicio, name); if(e){setStartDate(id, e)}}}
                className="rounded-md flex justify-center border"
            />
        </PopoverContent>
    </Popover>
    
    {/* end time  */}
    <Popover>
        <div className='flex items-center gap-1 text-sm font-medium'><PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm '><Image src='/iconos/down.svg' alt='' width={20} height={20} /></div></PopoverTrigger>{fin}</div>
        <PopoverContent>
            <Calendar
                mode="single"
                // selected={date}
                onSelect={(e) => { updateEndTime(e, id, user, fechaFin, name); if(e){setEndDate(id, e)}}}
                className="rounded-md flex justify-center border"
            />
        </PopoverContent>
    </Popover>
</div>
  )
}
