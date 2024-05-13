import Image from 'next/image'
import React from 'react'

export default function page() {
    return (// cambiar por foto de casa italia o logo del programa
        <div className='bg-black w-screen h-screen' >
            <Image src="/fotos/menu.jpg" alt="" className='h-full mx-auto' />
        </div>
    )
}
