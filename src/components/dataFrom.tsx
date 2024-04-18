'use client'

import Link from 'next/link'
import React, { useState } from 'react'


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

    data = data.data

    const compareFillName = data.filter(
        //@ts-ignore
        file => file.name == fileName)

    return (
        <div className=''>
            <form className='flex flex-col p-5 gap-4' onSubmit={async (e) => {
                e.preventDefault()

                const dataFile = {
                    name: fileName,
                    type: type,
                    duration: duration
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


                <select name="" id="" className='bg-neutral-800 p-1 shadow-lg ' required onChange={(e) => { const string = (e.target.value); setType(string); console.log(string) }}>
                    <option value="img" className=''>imagen</option>
                    <option value="video" className=''>video</option>
                </select>


                <input type="file" className='shadow-lg bg-neutral-800 file file:bg-neutral-700 file:text-white' onChange={(e) => {
                    //@ts-ignore 
                    setFile(e.target.files[0])
                    //@ts-ignore
                    setFileName(e.target.files[0].name)
                }} required />
                <input type="number" className='shadow-lg bg-neutral-800 p-2' name="" id="" placeholder="Duracion" onChange={(e) => { const number = Number(e.target.value); setDuration(number * 1000); console.log(number) }} />

                <button className='bg-slate-800 p-3 hover:scale-105 transition shadow-lg '>Subir Imagen</button>
                {
                    (data.length !== 0) ? <Link href='/vista' className='bg-slate-800 p-3 hover:scale-105 transition text-center shadow-lg '>ir a vista</Link> : <div className='bg-slate-800 p-3 hover:scale-105 transition text-center'>agrega un Archivo</div>
                }
            </form>
        </div>
    )
}
