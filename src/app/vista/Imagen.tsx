'use client'

import React, { useState, useEffect } from 'react';
import { verificarEstadoActividad } from '../services/verificarActividad';
import ImageOrVideo from './img';

const ImageRotator = ({ data }: any) => {

    const publicaciones = data

    //@ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const imagenes: any = []

    publicaciones.forEach((imagen: any) => {
        if (verificarEstadoActividad(imagen.fecha_inicio, imagen.Fecha_Fin)) {
            imagenes.push(imagen)
        }
    });

    //@ts-ignore
    console.log(imagenes)

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
    }, [currentImage.duration, currentImageIndex, imagenes]);

    return (
        <div className='h-full'>

            <ImageOrVideo currentImage={currentImage} />

        </div>
    );
};

export default ImageRotator;