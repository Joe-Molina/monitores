'use client'

import React, { useState, useEffect, useRef } from 'react';
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
    const [currentImage, setCurrentImage] = useState(imagenes[0]);

    const currentImageIndex = imagenes.findIndex(
        //@ts-ignore
        item => item.name === currentImage.name);

    useEffect(() => {

        const intervalId = setInterval(() => {

            if ((currentImageIndex + 1) % imagenes.length === 0) {
                return location.reload()
            }

            let nextIndex = (currentImageIndex + 1) % imagenes.length;
            setCurrentImage(imagenes[nextIndex]);
        }, currentImage.duration);

        return () => clearInterval(intervalId);
    }, [currentImage.duration, currentImageIndex, imagenes]);

    const cambiarImg = () => {
        let nextIndex = (currentImageIndex + 1) % imagenes.length;
        setCurrentImage(imagenes[nextIndex]);
    }

    const handleKeyPress = (event: { key: string; }) => {
        console.log(event.key)
        if (event.key === 'ArrowRight') {
            let nextIndex = (currentImageIndex + 1) % imagenes.length;
            setCurrentImage(imagenes[nextIndex]);
        }
        if (event.key === 'ArrowLeft') {
            let nextIndex = (currentImageIndex - 1) % imagenes.length;
            setCurrentImage(imagenes[nextIndex]);
        }
    };

    const [fadeIn, setFadeIn] = useState('fade-in')

    useEffect(() => {

        if (imagenes.length > 1) {
            setFadeIn('fade-in')
        } else {
            setFadeIn('')
        }
    }, [imagenes.length])


    // console.log(fadeIn)
    return (
        <div className='h-full '>

            <ImageOrVideo currentImage={currentImage} fadeIn={fadeIn} className="z-20 absolute" />

            <button className='absolute h-full w-full  top-0 left-0' onKeyDown={handleKeyPress} ></button>
        </div>
    );
};

export default ImageRotator;