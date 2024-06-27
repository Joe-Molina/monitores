'use client'

import React, { useEffect, useState } from 'react'
import { PubliCard } from './PublisCard';
import { usePostsContext } from '../hooks/usePosts';

const sortByPriority = (a: { position: number }, b: { position: number }) => {
    if (a.position < b.position) return -1;
    if (a.position > b.position) return 1;
    return 0;
};

export function PublisCollection({ user }: any) {
    const {postsState} = usePostsContext()
    const {Posts} = postsState
    
    let [PriorityOrder, setPriorityOrder] = useState(Posts)

    useEffect(() => {
        const sortedArray = [...Posts].sort(sortByPriority);
        const publis = sortedArray.filter((element: { type: string }) => element.type === 'img' || element.type === 'video');
        setPriorityOrder(publis);
    }, [Posts])

    return (
        <div className='p-3 flex gap-4 justify-stretch flex-wrap overflow-auto text-white'>

            {
                PriorityOrder.map((publi: any, index: any) => (
                    <PubliCard publi={publi} key={index} user={user} />
                ))
            }
        </div>
    )
}