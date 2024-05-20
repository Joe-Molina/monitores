'use client'

import React, { useState, useEffect, useRef } from 'react';
import { verificarEstadoActividad } from '../services/verificarActividad';
import ImageOrVideo from './img';
import { Progress } from "@/components/ui/progress"

export const useCountdown = (length: number) => {
    const [seconds, setSeconds] = useState(length);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setSeconds((prevSeconds) =>
                prevSeconds > 0 ? prevSeconds - 1 : prevSeconds,
            );
        }, 1000)

        return () => clearTimeout(timeoutId)

    }, [seconds]);

    return { seconds }
}


const ImageRotator = ({ data }: any) => {

    let [PriorityOrder, setPriorityOrder] = useState(data)

    useEffect(() => {


        const sortByPriority = (a: { position: number }, b: { position: number }) => {
            if (a.position < b.position) return -1;
            if (a.position > b.position) return 1;
            return 0;
        };

        const sortedArray = [...data].sort(sortByPriority);
        setPriorityOrder(sortedArray);

        console.log()
    }, [])

    const publicaciones = PriorityOrder

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

    const Timer = () => {
        let { seconds } = useCountdown(currentImage.duration / 1000)

        const total = publicaciones.length


        return (
            <div>
                <div className="flex items-center justify-center z-30 absolute border border-white w-10 h-7 rounded-sm top-5 right-3 opacity-45">{currentImageIndex + 1}/{total}</div>
            </div>
        )
    }

    function ProgressDemo() {
        const [progress, setProgress] = React.useState(0)



        const fraccionASumar = 100000 / (currentImage.duration)
        //@ts-ignore
        setInterval(() => setProgress(parseInt(progress + fraccionASumar)), 950)

        console.log(progress)



        return <Progress value={progress} className="w-[100%] z-40 absolute bg-white/10 h-2 opacity-25" />
    }

    return (
        <div className='relative h-full'>
            <Timer />
            <ProgressDemo />
            <ImageOrVideo currentImage={currentImage} fadeIn={fadeIn} />

            <button className='absolute h-full w-full  top-0 right-0' onKeyDown={handleKeyPress} ></button>
        </div>
    );
};

export default ImageRotator;