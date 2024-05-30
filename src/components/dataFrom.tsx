'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { serviceSubirArchivoACarpeta, serviceSubirRegistro } from '@/services/subirPublicacion'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"
import Image from 'next/image'

function agregarUnDia(fecha: any) {
    const nuevaFecha = new Date(fecha.getTime());
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    return nuevaFecha;
}


export function FormCard({ data, user }: any) {
    const [viewBanner, setViewBanner] = useState(false)
    const [bannerText, setBannerText] = useState("")

    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
    const [type, setType] = useState('img')
    const [duration, setDuration] = useState(0)
    let [fecha_inicio, setFecha_inico] = useState()
    let [Fecha_Fin, setFecha_fin] = useState()
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

        //@ts-ignore
        setDesde(dateStart.toLocaleDateString())

        //@ts-ignore
        setHasta(dateEnd.toLocaleDateString())


    }, [dateStart, dateEnd])

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
                <label htmlFor="" className='font-bold'>Sube un Archivo</label>



                <RadioGroup defaultValue="img">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="img" id="img" onClick={(e: any) => { const string = (e.target.value); setType(string); setViewBanner(false);}} />
                        <Label htmlFor="img">img</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="option-two" onClick={(e: any) => { const string = (e.target.value); setType(string); setViewBanner(false);}} />
                        <Label htmlFor="option-two" >video</Label >

                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="banner" id="option-3" onClick={(e: any) => { const string = (e.target.value); setType(string); setViewBanner(true);}} />
                        <Label htmlFor="option-3" >banner</Label >

                    </div>
                </RadioGroup>

                {
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

                }

                

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
