'use client'

import React, { useState } from 'react'
import { PublisCollection } from './PublisCollection'
import { Button } from '../../../components/ui/button'
import { BannersCollection } from './BannersCollection'

function Marquee({ publicidades, session }: any) {
    const Banners = publicidades.filter((element: { type: string }) => {

        if (element.type == "banner") {
            return true
        }

    })

    const publis = publicidades.filter((element: { type: string }) => {

        if (element.type == "img" ||  element.type == "video") {

            return true
        }

    })
    const [pagePublis, setPagePublis] = useState(true)

    const focus = 'bg-neutral-800 text-white hover:bg-neutral-900'

    return (
        <div className='flex h-full w-full flex-col'>
            <div className='flex gap-2 h-[5%] w-full'>
                <Button className={pagePublis ? focus : ''} onClick={() => { setPagePublis(true) }}>Archivos</Button>
                <Button className={pagePublis ? '' : focus} onClick={() => { setPagePublis(false) }}>Banners</Button>
            </div>

            {pagePublis == true &&
                <div className='bg-neutral-900 h-[95%]'>
                    <PublisCollection data={publis} user={session.user} />
                </div>
            }

            {pagePublis == false &&
                <div className='bg-neutral-900 h-[95%]'>
                    <BannersCollection data={Banners} user={session.user} />
                </div>
            }
        </div>
    )
}

export default Marquee