"use client";

import { useState, useEffect } from "react";

const slideData = [
  {
    type: "slide1",
    tagline: "FASHION & STYLE",
    headline: "Own the Spotlight",
    subtext: "Experience the pinnacle of high-fashion luxury.",
    position: "bottom-left"
  },
  {
    type: "slide2",
    tagline: "DANCE & MOVEMENT",
    headline: "Move as One",
    subtext: "Feel the concert energy and synchronize your soul.",
    position: "bottom-right"
  },
  {
    type: "slide3",
    tagline: "RUNWAY & PRESENCE",
    headline: "Walk with Purpose",
    subtext: "Architectural minimalism in every single step.",
    position: "top-left"
  },
  {
    type: "slide4",
    tagline: "VOICE & MUSIC",
    headline: "Sing Your Truth",
    subtext: "Intimate spotlight moments that resonate deeply.",
    position: "bottom-left"
  }
];

export default function HeroSlider({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;700&display=swap');

        .font-barlow-300 { font-family: 'Barlow Condensed', sans-serif; font-weight: 300; }
        .font-barlow-700 { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; }

        @keyframes corner-slide-left { 0% { transform: translateX(-60px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes corner-slide-right { 0% { transform: translateX(60px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
        @keyframes draw-line { 0% { width: 0; } 100% { width: 100%; } }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
      `}} />
      
      <div className="absolute inset-0 -z-10 overflow-hidden bg-black flex flex-col justify-center">
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
            }`}
            style={{ backgroundImage: `url('${imgSrc}')` }}
          />
        ))}
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />

        {/* Overlay Content Container */}
        <div className="relative z-20 w-full h-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          {images.map((imgSrc, index) => {
            if (index !== currentIndex) return null;
            const data = slideData[index];

            const isLeft = data.position.includes('left');
            const isTop = data.position.includes('top');
            
            // Positioning utility logic
            const alignClasses = isLeft ? 'items-start text-left' : 'items-end text-right';
            const positionClasses = `absolute ${isTop ? 'top-32 md:top-40' : 'bottom-12 md:bottom-20'} ${isLeft ? 'left-6 md:left-12 lg:left-20' : 'right-6 md:right-12 lg:right-20'}`;
            
            const animationDir = isLeft ? 'corner-slide-left' : 'corner-slide-right';

            return (
              <div 
                key={`slide-${index}`} 
                className={`${positionClasses} flex flex-col ${alignClasses} max-w-xl md:max-w-3xl w-full`}
              >
                {/* Tagline */}
                <div 
                  className="uppercase inline-block mb-4 md:mb-6 border border-[#C0C0C0] text-[#C0C0C0]"
                  style={{ 
                    letterSpacing: '3px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    borderWidth: '1px',
                    opacity: 0,
                    animation: 'fade-in 0.3s ease-out forwards'
                  }}
                >
                  {data.tagline}
                </div>
                
                {/* Headline (Male Model size increased) */}
                <h2 
                  className="font-barlow-700 uppercase text-[#FFFFFF] drop-shadow-xl leading-none"
                  style={{
                    fontSize: 'clamp(2.5rem, 8vw, 7.5rem)',
                    letterSpacing: '0.08em',
                    opacity: 0,
                    animation: `${animationDir} 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards`
                  }}
                >
                  {data.headline}
                </h2>

                {/* Drawing Silver Line */}
                <div className={`w-full mt-4 md:mt-6 mb-4 md:mb-6 flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  <div 
                    className="h-[2px] bg-[#C0C0C0] drop-shadow-md"
                    style={{
                      width: 0,
                      animation: `draw-line 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards`
                    }}
                  />
                </div>
                
                {/* Subtext */}
                <p 
                  className="font-barlow-300 uppercase tracking-[0.2em] text-xl md:text-3xl w-full text-[#C0C0C0]"
                  style={{
                    opacity: 0,
                    animation: 'fade-in 0.8s ease-in 1.1s forwards'
                  }}
                >
                  {data.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}