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
import { usePostsContext } from '../hooks/usePosts'
import { FormState } from '../interfaces/interfaces'

const INITIAL_STATE= {
        id: 0,
        name: "",
        type: "img",
        position: 0,
        duration: 0,
        fecha_inicio: new Date,
        Fecha_Fin: new Date,
}

export function Form({ data, user }: any) {
    const [file, setFile] = useState()
    const { formState, setEmptyForm} = useFormContext();
    const {setPost} = usePostsContext() 
    
        const handleClick = async(event: any) => {
            event.preventDefault(); 

            const datos = await verificarArchivo(data, user, file, formState)

            console.log('datos')
            console.log(datos)
            if(datos){
                setPost(datos)
                setEmptyForm(INITIAL_STATE)
            }

        }


    return (

        <div className='dark'>

            <form className='flex flex-col p-5 gap-4' >
                <h1 className='text-xl font-bold'>Bienvenido {user.name}</h1>
                <ArchiveType/>
                <ArchiveOrBanner setFile={setFile}/>  
                <DurationCard/>
                <Dates/>
                <Button onClick={(e) => {handleClick(e)}}>Subir Imagen</Button>
                <Link href='/vista' className='w-full'><Button className='w-full'>ir a vista</Button></Link>
            </form>

        </div >

    )
}
