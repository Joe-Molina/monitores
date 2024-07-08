/* eslint-disable @next/next/no-img-element */
import { MONITOR_IP } from '@/app/inicio/services/EndPoints'
import Image from 'next/image'
import React from 'react'

export const ImgOrVideo = ({publi}: any) => {
  return (
    <div className='relative h-56 mx-auto bg-black overflow-hidden flex'>
        {
                    (publi.type !== "video") ?
                    <div className='h-56 w-40 mx-auto bg-black overflow-hidden flex'>
                        <a href={'/fotos/' + publi.name} target='_blank'>
                            <img src={MONITOR_IP + '/fotos/' + publi.name} alt="" className='mx-auto h-full'/>
                        </a>
                    </div>
                    :
                    <video src={'/fotos/' + publi.name} controls ></video>
        }
    </div>
  )
}
