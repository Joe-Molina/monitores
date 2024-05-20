import Image from 'next/image';
import './vista.css'
import { useCountdown } from './services/useCountdown';
import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress"
import React from 'react';


const ImageOrVideo = ({ currentImage, fadeIn }: any) => {

    //     const Timer = () => {
    //         let { seconds } = useCountdown(currentImage.duration / 1000)

    //         return (
    //             <div>{seconds}</div>
    //         )
    //     }


    if (currentImage.type === "img") {
        return (
            <div>

                <Image
                    src={'/fotos/' + currentImage.name}
                    alt="Image"
                    className={`h-full mx-auto max-w-[1000px] ${fadeIn}`}
                    key={currentImage.name}
                    fill
                />
                {/* <Timer /> */}

            </div>
        );
    } else {
        return (
            <video src={'/fotos/' + currentImage.name} className={`h-full mx-auto ${fadeIn}`} autoPlay key={currentImage.name} />
        );
    }
};

export default ImageOrVideo;