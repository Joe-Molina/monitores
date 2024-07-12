import Image from 'next/image'
import React, { useEffect } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { CalendarIcon } from "@radix-ui/react-icons"

import { editPost } from '../services/postEdit'
import { MONITOR_IP } from '@/app/inicio/services/EndPoints'
import { usePostsContext } from '@/app/inicio/hooks/usePosts'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useIpContext } from '@/app/inicio/hooks/useIp'

export function DatePickerWithRange({ fechaFin, fechaInicio, id }: any) {
  const { IpState } = useIpContext()
  const { setEndDate, setStartDate } = usePostsContext()

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(fechaInicio),
    to: new Date(fechaFin),
  })

  useEffect(() => {
    if (date) {
      const edit = {
        fechaFin: date.to,
        fechaInicio: date.from,
      }
      const datos = async () => {
        const data = await editPost(edit, IpState, id)
        setEndDate(id, data.newEndDate)
        setStartDate(id, data.newStartDate)
      }
      datos()
    }



  }, [date])

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy")} - {" "}
                  {format(date.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}


export default function EditPopover({ publi, ip }: any) {
  const { setDuration, setPosition, setStartDate, setEndDate } = usePostsContext()

  const [edit, setEdit] = React.useState({
    position: publi.position,
    duration: publi.duration,
    fechaInicio: new Date(Date.parse(publi.fecha_inicio)),
    fechaFin: new Date(Date.parse(publi.Fecha_Fin)),
  });

  console.log()

  const handleClick = async () => {


    const data = await editPost(edit, ip, publi.id)

    setDuration(publi.id, data.newDuration)

    if (data.newPositions != 'Position vacía') {
      setPosition(data.newPositions.publi1.id, data.newPositions.publi1.position)
      if (data.newPositions.publi2) {
        setPosition(data.newPositions.publi2.id, data.newPositions.publi2.position)
      }
    }
    setEndDate(publi.id, data.newEndDate)
    setStartDate(publi.id, data.newStartDate)

  }



  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 p-0 flex justify-center items-center rounded-sm hover:bg-blue-600/10 transition' ><Image src='/iconos/edit.svg' alt='' width={20} height={20} /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Publicacion</DialogTitle>
          <DialogDescription>
            Aca puedes cambiar la fecha, posicion y duracion de la publicacion.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap justify-evenly gap-4 py-4">

          <div className=" items-center gap-4 w-1/3">
            <Label htmlFor="duracion" className="text-right">
              Duracion
            </Label>
            <Input id="duracion" type="number" placeholder="segundos..." className="col-span-2 text-sm" onChange={(e) => {
              if (e) {
                setEdit({ ...edit, duration: Number(e.target.value) * 1000 });
                console.log(edit)
              }
            }} />
          </div>

          <div className=" items-center gap-4 w-1/3">
            <Label htmlFor="Posicion" className="text-right">
              Posicion
            </Label>
            <Input id="Posicion" type="number" className="text-white" onChange={(e) => {
              if (e) {
                setEdit({ ...edit, position: Number(e.target.value) });
                console.log(edit)
              }
            }} />
          </div>

        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleClick}>Guardar</Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
