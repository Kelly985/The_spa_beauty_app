import React, { useState, useEffect } from 'react';
 
const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: 'images/nails.jpg',
      text: 'NAIL PARLOUR',
    },
    {
      image: 'images/barber.jpg',
      text: 'BARBER SHOP',
    },
    {
      image: 'images/hrd.jpg',
      text: 'HAIR DRESSER',
    },
    {
      image: 'images/massage.jpg',
      text: 'MASSAGE ACTIVITIES',
    },
    {
      image: 'images/mkup.jpg',
      text: 'MAKE UP SERVICES',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slideshow-container">
      <div className="slideshow-card">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <div className="slide-content">
              <img src={slide.image} alt={slide.text} />
              <div className="caption">{slide.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
