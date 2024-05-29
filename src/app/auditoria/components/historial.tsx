'use client'


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import React, { useState } from 'react'


export function TablaHistorial({ data }: any) {

    console.log(data)
    return (
        <Table className="">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Fecha</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((dato: any, index: any) => {

                    if (dato.tipo == 'historial') {

                        return (

                            <TableRow key={index}>
                                <TableCell className="font-medium">{dato.id}</TableCell>
                                <TableCell>{dato.accion}</TableCell>
                                <TableCell>{dato.descripcion}</TableCell>
                                <TableCell>{dato.created_at.toLocaleString()}</TableCell>
                            </TableRow>
                        )

                    }
                })
                }




            </TableBody>
        </Table>
    )
}

export function TablaModificaciones({ data }: any) {

    console.log(data)
    return (
        <Table className="dark">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((dato: any, index: any) => {

                    if (dato.tipo !== 'historial') {

                        return (

                            <TableRow key={index}>
                                <TableCell className="font-medium">{dato.id}</TableCell>
                                <TableCell>{dato.accion}</TableCell>
                                <TableCell>{dato.descripcion}</TableCell>
                                <TableCell>{dato.tipo}</TableCell>
                                <TableCell>{dato.created_at.toLocaleString()}</TableCell>
                            </TableRow>
                        )

                    }
                })
                }




            </TableBody>
        </Table>
    )
}




function Historial({ data }: any) {

    console.log(data)

    const [page, setPage] = useState(false)

    const press = page ? "bg-slate-700" : ""
    const press2 = page ? "" : "bg-slate-700"

    return (
        <>
            <div className="flex h-[5%] w-full border-b-2 text-white">
                <div className={`w-32  flex justify-center items-center ${press2}`}>
                    <button onClick={() => { setPage(false) }} >Historial</button>
                </div>
                <div className={`w-32  flex justify-center items-center ${press}`}>
                    <button onClick={() => { setPage(true) }} >Modificaciones</button>
                </div>
            </div>
            <div className=" w-full h-[95%] text-white">
                {page == false && <TablaHistorial data={data} />}
                {page == true && <TablaModificaciones data={data} />}

            </div>
        </>

    )
}

export default Historial