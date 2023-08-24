import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./MyCarousal.css";

import pi from "../ima/pi.jpg";



const MyCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Start the auto-slide interval
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
    }, 4000); // Change slide every 2 seconds

    // Clean up the interval when component unmounts
    return () => clearInterval(interval);
  }, [currentIndex]);

  const slides = [
    { image: pi, alt: "Slide 1" },
   
   
  ];

  return (
    <div className="carousel-container p-2">
      <Carousel
        selectedItem={currentIndex}
        showThumbs={false}
        showStatus={false}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={slide.alt} />
           
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;