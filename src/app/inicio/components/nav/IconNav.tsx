import Image from 'next/image'
import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form } from '../Form'

const Icon = ({url, alt, message}:any) => {
  const handleClick = () => {
    console.log('hola')
  }
  return (

    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
    <div className='opacity-50 hover:opacity-100 transition bg-neutral-950 hover:bg-neutral-900 m-1 p-2 rounded-sm' onClick={() => {handleClick()}}>
    <Image src={url} alt={alt} width={30} height={30}/>
    </div>
    </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default function IconNavFunction({url, alt, message, session}:any) {


  return (
    <Sheet>
  <SheetTrigger><Icon url={url} alt={alt} message={message}/></SheetTrigger>
        <Form user={session} />
    </Sheet>
    
  )
}
