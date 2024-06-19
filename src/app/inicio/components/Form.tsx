'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"

import { serviceSubirArchivoACarpeta, serviceSubirRegistro } from '@/services/subirPublicacion'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import { useFormContext } from '../hooks/useForm'
import ArchiveType from './Form/ArchiveType'
import ArchiveOrBanner from './Form/ArchiveOrBanner'

export function Form({ data, user }: any) {
    const {formState, setTypeForm} = useFormContext()

    const [viewBanner, setViewBanner] = useState(false)
    const [bannerText, setBannerText] = useState("")

    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
    const [type, setType] = useState('img')
    const [duration, setDuration] = useState(0)
    const [dateStart, setDateStart] = React.useState<Date | undefined>(new Date())
    const [dateEnd, setDateEnd] = React.useState<Date | undefined>(new Date())
    const [Desde, setDesde] = useState("Desde")
    const [Hasta, setHasta] = useState("Hasta")

    const compareFillName = data.filter(
        //@ts-ignore
        file => file.name == fileName)


    const verificarArchivo = async (dataFile: any) => {
        if (compareFillName.length > 0) {
            return alert("ya hay un documento llamado " + fileName + " debes cambiar el nombre del archivo que quieres guardar antes de subirlo")

        } else {
            // es un archivo nuevo
            await serviceSubirRegistro(dataFile, user)
            if(viewBanner === false){
                await serviceSubirArchivoACarpeta(file)
            }
        }

         location.reload();
    }

    useEffect(()=> {

        // @ts-ignore
        setDesde(dateStart.toLocaleDateString())

        //@ts-ignore
        setHasta(dateEnd.toLocaleDateString())


    }, [dateStart, dateEnd])

    useEffect(()=> {

        console.log(file)

    }, [file])



    return (

        <div className='dark'>

            <form className='flex flex-col p-5 gap-4' onSubmit={async (e) => {
                e.preventDefault()

                const dataFile = {
                    name: viewBanner? bannerText : fileName,
                    type: type,
                    duration: duration,
                    fecha_inicio: dateStart,
                    Fecha_Fin: dateEnd,
                }

                verificarArchivo(dataFile)
            }}>

                <h1 className='text-xl font-bold'>Bienvenido {user.name}</h1>

                <ArchiveType/>

                <ArchiveOrBanner setFile={setFile} file={file}/>


                {/* {
                    viewBanner? 
                    
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="texto">Texto</Label>
                        <Input  type="text" onChange={(e) => {
                            //@ts-ignore 
                            setBannerText(e.target.value)
                        }} required />
                    </div>
                    
                    
                    :

                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="archivo">Archivo</Label>
                        <Input id="archivo" type="file" onChange={(e) => {
                            //@ts-ignore 
                            setFile(e.target.files[0])
                            //@ts-ignore
                            setFileName(e.target.files[0].name)
                        }} required />
                    </div>

                } */}

                

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="archivo">Duracion en segundos</Label>
                    <Input type="number" onChange={(e) => { const number = Number(e.target.value); setDuration(number * 1000); console.log(number) }} />
                </div>

                <div className='flex justify-around'>
                <Popover>
                        <div className='flex items-center gap-1 text-sm font-medium'> <PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/up.svg' alt='' width={20} height={20} /></div></PopoverTrigger>{Desde}</div>
                        <PopoverContent>
                            <Calendar
                                mode="single"
                                onSelect={setDateStart}
                                className="rounded-md flex justify-center border"
                            />
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <div className='flex items-center gap-1 text-sm font-medium'> <PopoverTrigger><div className='bg-neutral-900/70  border border-neutral-700 w-7 h-7 flex justify-center items-center rounded-sm'><Image src='/iconos/down.svg' alt='' width={20} height={20} /></div></PopoverTrigger>{Hasta}</div>
                        <PopoverContent>
                            <Calendar
                                mode="single"

                                onSelect={setDateEnd}
                                className="rounded-md flex justify-center border"
                            />
                        </PopoverContent>
                    </Popover>

                </div>

                <Button>Subir Imagen</Button>
                <Link href='/vista' className='w-full'><Button className='w-full'>ir a vista</Button></Link>
            </form>
            {/* <div className='flex w-full px-5'>
                <Button className='flex w-full '>Crear Banner</Button>
            </div> */}

        </div >

    )
}
