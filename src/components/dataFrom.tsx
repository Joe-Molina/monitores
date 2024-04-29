'use client'
import Link from 'next/link'
import React, { useState } from 'react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const serviceSubirArchivoACarpeta = async (file: any) => {
    const form = new FormData()
    //@ts-ignore
    form.set('file', file)

    //sending file
    const res = await fetch('/api/upload', {
        method: "POST",
        body: form
    }
    )

    const data3 = await res.json()
    console.log('nuovo archivo')
    console.log(data3)
}

const serviceSubirRegistro = async (data: any) => {




    const res2 = await fetch('/api/subirInfo', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const newRegistro = await res2.json()
    console.log('nuovo registro')
    console.log(newRegistro)
}




export function FormCard(data: any) {
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
    const [type, setType] = useState('img')
    const [duration, setDuration] = useState(0)
    let [fecha_inicio, setFecha_inico] = useState()
    let [Fecha_Fin, setFecha_fin] = useState()

    data = data.data

    const compareFillName = data.filter(
        //@ts-ignore
        file => file.name == fileName)

    return (
        <div className='dark'>
            <form className='flex flex-col p-5 gap-4' onSubmit={async (e) => {
                e.preventDefault()

                const dataFile = {
                    name: fileName,
                    type: type,
                    duration: duration,
                    fecha_inicio,
                    Fecha_Fin,
                }

                if (compareFillName.length > 0) {
                    return alert("ya hay un documento llamado " + fileName + " debes cambiar el nombre del archivo que quieres guardar antes de subirlo")

                } else {
                    // es un archivo nuevo
                    serviceSubirRegistro(dataFile)
                    serviceSubirArchivoACarpeta(file)
                }

                location.reload()
            }}>
                <label htmlFor="" className='font-bold'>Sube un Archivo</label>



                <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="img" id="option-one" onClick={(e: any) => { const string = (e.target.value); setType(string); console.log(string) }} />
                        <Label htmlFor="option-one">img (por defecto)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="video" id="option-two" onClick={(e: any) => { const string = (e.target.value); setType(string); console.log(string) }} />
                        <Label htmlFor="option-two" >video</Label >

                    </div>
                </RadioGroup>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="archivo">Archivo</Label>
                    <Input id="archivo" type="file" onChange={(e) => {
                        //@ts-ignore 
                        setFile(e.target.files[0])
                        //@ts-ignore
                        setFileName(e.target.files[0].name)
                    }} required />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="archivo">Duracion en segundos</Label>
                    <Input type="number" onChange={(e) => { const number = Number(e.target.value); setDuration(number * 1000); console.log(number) }} />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="archivo">Fecha inicio</Label>
                    <Input type="date" onChange={(e) => {
                        //@ts-ignore
                        setFecha_inico(new Date(e.target.value))
                    }} />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="archivo">Fecha fin</Label>
                    <Input type="date" onChange={(e) => {
                        //@ts-ignore
                        setFecha_fin(new Date(e.target.value))
                    }} />
                </div>

                <Button>Subir Imagen</Button>
                {
                    (data.length !== 0) ? <Link href='/vista' className='w-full'><Button className='w-full'>ir a vista</Button></Link> : ''
                }
            </form>
        </div>
    )
}
