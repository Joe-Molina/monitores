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
import DurationCard from './Form/DurationCard'
import Dates from './Form/Dates'
import { verificarArchivo } from './Form/services/verificarArchivo'

export function Form({ data, user }: any) {
    const [viewBanner, setViewBanner] = useState(false)
    const [bannerText, setBannerText] = useState("")
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
    const [type, setType] = useState('img')
    const [duration, setDuration] = useState(0)
    const [dateStart, setDateStart] = React.useState<Date | undefined>(new Date())
    const [dateEnd, setDateEnd] = React.useState<Date | undefined>(new Date())

    useEffect(()=> {

        console.log(file)

    }, [file])


    return (

        <div className='dark'>

            <form className='flex flex-col p-5 gap-4' onSubmit={async (e) => {
                e.preventDefault()

                verificarArchivo(data, user, file)
            }}>

                <h1 className='text-xl font-bold'>Bienvenido {user.name}</h1>

                <ArchiveType/>
                <ArchiveOrBanner setFile={setFile}/>  
                <DurationCard/>
                <Dates/>



              

                <Button>Subir Imagen</Button>
                <Link href='/vista' className='w-full'><Button className='w-full'>ir a vista</Button></Link>
            </form>

        </div >

    )
}
