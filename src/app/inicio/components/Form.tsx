'use client'
import Link from 'next/link'
import React, {useState } from 'react'
import { Button } from "@/components/ui/button"
import { useFormContext } from '../hooks/useForm'
import ArchiveType from './Form/ArchiveType'
import ArchiveOrBanner from './Form/ArchiveOrBanner'
import DurationCard from './Form/DurationCard'
import Dates from './Form/Dates'
import { verificarArchivo } from './Form/services/verificarArchivo'

export function Form({ data, user }: any) {
    const [file, setFile] = useState()
    const { formState } = useFormContext();

    return (

        <div className='dark'>

            <form className='flex flex-col p-5 gap-4' >
                <h1 className='text-xl font-bold'>Bienvenido {user.name}</h1>
                <ArchiveType/>
                <ArchiveOrBanner setFile={setFile}/>  
                <DurationCard/>
                <Dates/>
                <Button onClick={(e) => {e.preventDefault(); verificarArchivo(data, user, file, formState)}}>Subir Imagen</Button>
                <Link href='/vista' className='w-full'><Button className='w-full'>ir a vista</Button></Link>
            </form>

        </div >

    )
}
