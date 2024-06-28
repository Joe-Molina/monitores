'use client'

import Image from 'next/image'
import React from 'react'
import IconNavFunction from './nav/IconNav'
import IconNavLink from './nav/IconNavLink'

export default function Nav({session}:any) {
  return (
    <aside className="[grid-area:aside] flex-col flex overflow-y-auto bg-neutral-950 text-white items-center  border-r border-neutral-700">
      <span className='w-full bg-neutral-900 border-b border-neutral-700'><Image src="/media.png" alt="" width={50} height={50}/></span>

      <IconNavFunction url="./iconos/nav/add.svg" alt="add Publi" message="crear publicacion" session={session} />

      <IconNavLink url="./iconos/nav/eye.svg" alt="add Publi" message="ir a vista"/>

      </aside>
  )
}


// crear funcion para llamar al form
{/* <Form
  //@ts-ignore
  data={publicidades} user={session.user} /> */}
  {/* <Link href='/auditoria' className='w-full'><Button className='w-full'>Registro de Actividades</Button></Link> */}