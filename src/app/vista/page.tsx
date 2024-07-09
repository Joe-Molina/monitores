import React from 'react'
import Imga from './Imagen'
import { verificarEstadoActividad } from '../inicio/services/verificarActividad'

import NoImage from './NoImage'
import { Banner } from './Banner'
import { getPosts } from '../inicio/services/Posts'
import { MONITOR_IP } from '../inicio/services/EndPoints'

async function Vista() {

    const publicidades = await getPosts(MONITOR_IP)

    console.log(publicidades)

    const publis = await publicidades.filter((element: { type: string }) => {

        if (element.type == "img" || element.type == "video") {
            return true
        }
    })

    const banners = await publicidades.filter((element: { type: string }) => {

        if (element.type == "banner") {

            return true
        }

    })

    const ActivePublis = publis.filter((publi: any) => verificarEstadoActividad((publi.fecha_inicio), publi.Fecha_Fin) === true)
    const ActiveBanners = banners.filter((publi: any) => verificarEstadoActividad((publi.fecha_inicio), publi.Fecha_Fin) === true)

    console.log(ActivePublis)

    const sortByPriority = (a: { position: number }, b: { position: number }) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
        return 0;
    };
    //@ts-ignore
    const sortedArray = [...ActivePublis].sort(sortByPriority);
    return (
        <div className='bg-black w-screen h-screen' >
            {ActiveBanners.length == 0 ?
                <div className={`h-[100%]`}>
                    {ActivePublis.length > 0 && <Imga data={sortedArray} />}
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