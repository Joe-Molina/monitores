'use client'
import Link from 'next/link'
import React, {useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { useFormContext } from '../hooks/useForm'
import ArchiveType from './Form/ArchiveType'
import ArchiveOrBanner from './Form/ArchiveOrBanner'
import DurationCard from './Form/DurationCard'
import Dates from './Form/Dates'
import { verificarArchivo } from './Form/services/verificarArchivo'
import { usePostsContext } from '../hooks/usePosts'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"


const INITIAL_STATE= {
        id: 0,
        name: "",
        type: "img",
        position: 0,
        duration: 0,
        fecha_inicio: new Date,
        Fecha_Fin: new Date,
}

export function Form({ user }: any) {

    console.log("form");
    console.log(user.id);

    const {postsState} = usePostsContext()
    const data = postsState.Posts

    const [file, setFile] = useState()
    const { formState, setEmptyForm} = useFormContext();
    const {setPost} = usePostsContext() 
    
        const handleClick = async() => {
            // event.preventDefault();
            console.log('array de posts')
            console.log(data)

            const datos = await verificarArchivo(data, user, file, formState)
            if(datos){
                setPost(datos)
                setEmptyForm(INITIAL_STATE)
            }
        }


    return (
        <SheetContent className='bg-neutral-950 border-neutral-800'>
        <SheetHeader>
        <SheetTitle>Bienvenido {user.name}</SheetTitle>
          <SheetDescription className='text-neutral-200'>Sube una publicacion o un banner.</SheetDescription>
        <div className='dark text-neutral-200'>
            <form className='flex flex-col p-5 gap-4' >
                <ArchiveType/>
                <ArchiveOrBanner setFile={setFile}/>  
                <DurationCard/>
                <Dates/>
            </form>
        </div >
    </SheetHeader>
    <SheetFooter>
                <SheetClose asChild>
                <Button type="submit" onClick={() => {handleClick()}}>Subir Imagen</Button>
          </SheetClose>
    </SheetFooter>
  </SheetContent>


    )
}
