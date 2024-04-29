import React, { useState, useEffect, useRef } from 'react';
import './vista.css'

//@ts-ignore
const ImageOrVideo = ({ currentImage }: any) => {

    console.log(currentImage)

    const fadeInStyle = {
        transition: 'opacity 0.5s ease-in-out',  // Animation properties

    };

    if (currentImage.type === "img") {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={'/fotos/' + currentImage.name}
                alt="Image"
                className='h-full mx-auto fade-in'
                key={currentImage.name} // Asigna una key única

            />
        );
    } else {
        return (
            <video src={'/fotos/' + currentImage.name} className='h-full mx-auto fade-in' autoPlay key={currentImage.name} /> // Asigna una key única
        );
    }
};

export default ImageOrVideo;