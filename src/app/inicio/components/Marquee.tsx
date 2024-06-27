'use client'

import React, { useEffect, useState } from 'react'
import { PublisCollection } from './PublisCollection'
import { Button } from '../../../components/ui/button'
import { BannersCollection } from './BannersCollection'
import { usePostsContext } from '../hooks/usePosts'
function Marquee({ session }: any) {
    
    
    const {postsState, setPost, setPosts} = usePostsContext()
    const {Posts} = postsState

    useEffect(() => {
        setPosts(); 
    }, []);

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
                    <PublisCollection user={session.user} />
                </div>
            }

            {pagePublis == false &&  Posts.length > 0  &&
                <div className='bg-neutral-900 h-[95%]'>
                    <BannersCollection data={Posts} user={session.user} />
                </div>
            }
        </div>
    )
}

export default Marquee