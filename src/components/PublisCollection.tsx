'use client'

import React, { useEffect, useState } from 'react'
import { PubliCard } from './PublisCard';

const sortByPriority = (a: { position: number }, b: { position: number }) => {
    if (a.position < b.position) return -1;
    if (a.position > b.position) return 1;
    return 0;
};

export function PublisCollection({ data, userId }: any) {
    let [PriorityOrder, setPriorityOrder] = useState(data)

    useEffect(() => {
        const sortedArray = [...data].sort(sortByPriority);
        setPriorityOrder(sortedArray);
    }, [])

    return (
        <div className='p-3 flex gap-4 justify-stretch flex-wrap overflow-auto text-white'>

            {
                PriorityOrder.map((publi: any, index: any) => (
                    <PubliCard publi={publi} key={index} userId={userId} />
                ))
            }
        </div>
    )
}