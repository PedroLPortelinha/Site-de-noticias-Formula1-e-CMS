import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import carImage from '../assets/f1.png';

export default function ScrollCar({ trailColor }) {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const location = useLocation();

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScrollPercentage(scrollPercent);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setScrollPercentage(0);
    window.scrollTo(0, 0); 
  }, [location]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full h-12 z-10 pointer-events-none">
      <div
        className="absolute top-0 w-full h-2"
        style={{
          background: `linear-gradient(to right, ${trailColor} ${scrollPercentage}%, white ${scrollPercentage}%)`,
          zIndex: 1
        }}
      ></div>
      <img src={carImage} className="absolute top-0 h-2" style={{ left: `${scrollPercentage}%`, zIndex: 2 }} />
    </div>
  );
}
