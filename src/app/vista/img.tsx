import Image from 'next/image';
import './vista.css'

const ImageOrVideo = ({ currentImage, fadeIn }: any) => {

    if (currentImage.type === "img") {
        return (
            <Image
                src={'/fotos/' + currentImage.name}
                alt="Image"
                className={`h-full mx-auto max-w-[1000px] ${fadeIn}`}
                key={currentImage.name}
                fill
            />
        );
    } else {
        return (
            <video src={'/fotos/' + currentImage.name} className={`h-full mx-auto ${fadeIn}`} autoPlay key={currentImage.name} />
        );
    }
};

export default ImageOrVideo;