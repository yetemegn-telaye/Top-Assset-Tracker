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
    <div className="flex flex-col gap-2 overflow-hidden">
      <div className="flex items-center gap-2 justify-between">
        <button
          className="text-accent rounded-full p-2"
          onClick={handlePrev}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} className="w-48 rounded" />
        <button
          className="text-accent rounded-full p-2"
          onClick={handleNext}
        >
         <FontAwesomeIcon icon={faAngleRight}/>
        </button>
      </div>
      <div className="flex justify-center">
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
