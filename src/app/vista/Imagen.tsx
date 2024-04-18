'use client'

import React, { useState, useEffect } from 'react';
//import { imagenes } from '../data/imagenes'; // Assuming imagenes is imported correctly

const ImageRotator = (data: any) => {

    const imagenes = data.data

    const [currentImage, setCurrentImage] = useState(imagenes[0]);


    const currentImageIndex = imagenes.findIndex(
        //@ts-ignore
        item => item.name === currentImage.name);

    useEffect(() => {

        const intervalId = setInterval(() => {
            let nextIndex = (currentImageIndex + 1) % imagenes.length;
            setCurrentImage(imagenes[nextIndex]);
        }, currentImage.duration);

        return () => clearInterval(intervalId);
    }, [currentImage.duration, currentImageIndex]);


    return (
        <div className='h-full'>

            {
                (currentImage.type === "img") ?

                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={'/fotos/' + currentImage.name}
                        alt="Image"
                        className='h-full mx-auto'
                    />

                    :

                    <video src={'/fotos/' + currentImage.name} className='h-full mx-auto' autoPlay />

            }



        </div>
    );
};

export default ImageRotator;