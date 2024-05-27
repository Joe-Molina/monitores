'use client'

import React, { useState } from 'react'
import { PublisCollection } from './PublisCollection'
import { Button } from './ui/button'

function Marquee({ publicidades }: any, session: any) {

    const Banners = publicidades.filter((element: { type: string }) => {

        if (element.type == "banner") {

            return true
        }

    })

    console.log('banners')
    console.log(Banners)

    const [pagePublis, setPagePublis] = useState(true)

    const focus = 'bg-neutral-800 text-white hover:bg-neutral-900'

    return (
        <div className='flex h-full w-full flex-col'>
            <div className='flex gap-2 h-[5%] w-full'>
                <Button className={pagePublis ? '' : focus} onClick={() => { setPagePublis(true) }}>Archivos</Button>
                <Button className={pagePublis ? focus : ''} onClick={() => { setPagePublis(false) }}>Banners</Button>
            </div>

            {pagePublis == true &&
                <div className='bg-neutral-900 h-[95%]'>
                    <PublisCollection
                        //@ts-ignore
                        data={publicidades} user={session.user} />
                </div>

            }

            {pagePublis == false &&
                <div className='bg-neutral-900 h-[95%]'>
                    <div className='marquee'>
                        <p>holaa</p>
                    </div>
                </div>

            }


        </div>
    )
}

export default Marquee