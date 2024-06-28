'use client'

import React, { useEffect, useState } from 'react'
import { PublisCollection } from './Publis/PublisCollection'
import { Button } from '../../../components/ui/button'
import { BannersCollection } from './Publis/BannersCollection'
import { usePostsContext } from '../hooks/usePosts'
function Marquee({ session }: any) {
    
    
    const {postsState, setPost, setPosts} = usePostsContext()
    const {Posts} = postsState

    useEffect(() => {
        setPosts()
    }, [])



    return (
        <div className='flex h-full w-full flex-col '>
            <div className='bg-neutral-950 flex items-center px-2 h-[52px] w-full border-b border-neutral-700' >
                <p className='font-2xl font-bold'>MediaCIM Web</p>
            </div>

                <div className='bg-neutral-950 h-[95%] m-3 border rounded-md overflow-auto'>
                    <h2 className='font-medium text-2xl pl-3 py-2 border-b '>Publicaciones</h2>
                    <PublisCollection user={session.user}/>
                    <h2 className='font-medium text-2xl pl-3 py-2 border-b '>Banners</h2>
                    <BannersCollection user={session.user} />
                </div>

        </div>
    )
}

export default Marquee