import React, { useState, useEffect, useRef } from 'react';
import './vista.css'

//@ts-ignore
const ImageOrVideo = ({ currentImage, fadeIn }: any) => {

    if (currentImage.type === "img") {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={'/fotos/' + currentImage.name}
                alt="Image"
                className={`h-full mx-auto ${fadeIn}`}
                key={currentImage.name} // Asigna una key única

            />
        );
    } else {
        return (
            <video src={'/fotos/' + currentImage.name} className={`h-full mx-auto ${fadeIn}`} autoPlay key={currentImage.name} /> // Asigna una key única
        );
    }
};

export default ImageOrVideo;