import React, { useEffect, useState } from 'react'
import Imga from './Imagen'
import { verificarEstadoActividad } from '../services/verificarActividad'
import Image from 'next/image'
import { prisma } from '../../libs/prisma'
import NoImage from './NoImage'
import { Banner } from './Banner'

async function Vista() {

    const publicidades = await prisma.publicidad.findMany()

    const publis = publicidades.filter((element: { type: string }) => {

        if (element.type == "img" ||  element.type == "video") {
            return true
        }
    })

    const banners = publicidades.filter((element: { type: string }) => {

        if (element.type == "banner") {

            return true
        }

    })

    //@ts-ignore
    const ActivePublis = publis.filter(publi => verificarEstadoActividad((publi.fecha_inicio), publi.Fecha_Fin) === true)
    const ActiveBanners = banners.filter(publi => verificarEstadoActividad((publi.fecha_inicio), publi.Fecha_Fin) === true)

    const sortByPriority = (a: { position: number }, b: { position: number }) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        return 0;
    };
    //@ts-ignore
    const sortedArray = [...ActivePublis].sort(sortByPriority);
        return (
            <div className='bg-black w-screen h-screen' >
                {ActiveBanners.length == 0?
                <div className={`h-[100%]`}>
                {ActivePublis.length > 0 && <Imga data={sortedArray}/>}
                {ActivePublis.length === 0 && <NoImage />}
                </div>
            :
            <><div className={`h-[95%]`}>
                        {ActivePublis.length > 0 && <Imga data={sortedArray} />}
                        {ActivePublis.length === 0 && <NoImage />}
                    </div><div className='h-[5%] flex w-full'>
                            <Banner data={banners} />
                        </div></>
                }
            </div>       
        )
}
export default Vista