import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="flex items-center w-64 justify-between">
        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-gray-300 rounded-full p-2"
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} className="w-full rounded" />
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-gray-300 rounded-full p-2"
          onClick={handleNext}
        >
         <FontAwesomeIcon icon={faAngleRight}/>
        </button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentImageIndex ? 'bg-gray-600' : 'bg-gray-300'
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
