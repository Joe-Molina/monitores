import Image from 'next/image'
import React from 'react'

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
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { editPost } from '../services/postEdit'
import { MONITOR_IP } from '@/app/inicio/services/EndPoints'
import { usePostsContext } from '@/app/inicio/hooks/usePosts'

export default function EditPopover({ id, ip }: any) {
  const { setDuration, setPosition, setStartDate, setEndDate } = usePostsContext()

  console.log(id)

  const [edit, setEdit] = React.useState({
    position: 0,
    duration: 0,
    fechaInicio: new Date(),
    fechaFin: new Date(),
  });

  const handleClick = async () => {


    const data = await editPost(edit, ip, id)

    setDuration(id, data.newDuration)

    if (data.newPositions != 'Position vacía') {
      setPosition(data.newPositions.publi1.id, data.newPositions.publi1.position)
      if (data.newPositions.publi2) {
        setPosition(data.newPositions.publi2.id, data.newPositions.publi2.position)
      }
    }
    setEndDate(id, data.newEndDate)
    setStartDate(id, data.newStartDate)

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

          <div className="justify-center items-center gap-4 w-1/3">

            <div className='border-t border-x py-2 px-3 rounded-t-md'>
              {edit.fechaInicio.toISOString().slice(0, 10)}
            </div>

            <Popover>
              <div className='flex justify-center border items-center gap-1 p-1 text-sm font-medium rounded-b-sm'>
                <PopoverTrigger>
                  <div className='flex items-center'><Label htmlFor="Fecha_Fin" className="text-right mr-1">
                    Fecha Inicio
                  </Label><Image src='/iconos/up.svg' alt='' width={20} height={20} />
                  </div>
                </PopoverTrigger>
              </div>
              <PopoverContent>
                <Calendar
                  mode="single"
                  // selected={date}
                  onSelect={(e) => {
                    if (e) {
                      setEdit({ ...edit, fechaInicio: e });
                      console.log(edit)
                    }
                  }}
                  className="rounded-md flex justify-center border"
                />
              </PopoverContent>
            </Popover>

          </div>

          <div className="items-center gap-4 w-1/3">
            <Popover>
              <div className='flex items-center gap-1 text-sm font-medium'>
                <PopoverTrigger>
                  <div className='flex items-center'><Label htmlFor="Fecha_Fin" className="text-right mr-1">
                    Fecha Fin
                  </Label><Image src='/iconos/down.svg' alt='' width={20} height={20} />
                  </div>
                </PopoverTrigger>
              </div>
              <PopoverContent>
                <Calendar
                  mode="single"
                  // selected={date}
                  onSelect={(e) => {
                    if (e) {
                      setEdit({ ...edit, fechaFin: e });
                      console.log(edit)
                    }
                  }}
                  className="rounded-md flex justify-center border"
                />
              </PopoverContent>
            </Popover>
            <div className='border py-2 px-1 rounded-md'>
              {edit.fechaFin.toISOString().slice(0, 10)}
            </div>
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
