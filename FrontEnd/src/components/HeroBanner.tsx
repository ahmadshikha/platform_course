import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import carouselBg1 from "@/assets/carusel1.jpg";
import carouselBg2 from "@/assets/carusel2.jpg";
import carouselBg3 from "@/assets/carusel3.jpg";
import carouselBg4 from "@/assets/carusel4.jpg";

export const HeroBanner = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: t('hero.slide1.title'),
      subtitle: t('hero.slide1.subtitle'),
      cta: t('hero.slide1.cta'),
      bgImage: carouselBg1,
      textPosition: "left"
    },
    {
      title: t('hero.slide2.title'),
      subtitle: t('hero.slide2.subtitle'),
      cta: t('hero.slide2.cta'),
      bgImage: carouselBg2,
      textPosition: "right"
    },
    {
      title: t('hero.slide3.title'),
      subtitle: t('hero.slide3.subtitle'),
      cta: t('hero.slide3.cta'),
      bgImage: carouselBg3,
      textPosition: "left"
    },
    {
      title: t('hero.slide4.title'),
      subtitle: t('hero.slide4.subtitle'),
      cta: t('hero.slide4.cta'),
      bgImage: carouselBg4,
      textPosition: "right"
    }
  ];

  // الانتقال التلقائي بين الشرائح
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // تغيير الشريحة كل 5 ثواني

    return () => clearInterval(interval);
  }, [slides.length]);

  // الانتقال لشريحة محددة
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden group">
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {/* Overlay متدرج لتحسين قراءة النص */}
            <div className={`absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 ${
              slide.textPosition === "left" ? "" : "bg-gradient-to-l"
            }`} />
            
            {/* المحتوى مع تحديد الموضع */}
            <div className={`relative z-10 container mx-auto px-4 h-full flex items-center ${
              slide.textPosition === "left" ? "justify-start" : "justify-end"
            }`}>
              <div className={`max-w-md text-white animate-fade-in-up ${
                slide.textPosition === "left" ? "text-left ml-8" : "text-right mr-8"
              }`}>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl lg:text-2xl mb-8 leading-relaxed font-light">
                  {slide.subtitle}
                </p>
                <div className={slide.textPosition === "left" ? "" : "flex justify-end"}>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {slide.cta} 
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* مؤشرات الشرائح - مربعات في الزاوية اليمنى السفلية */}
      <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`انتقل إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>

      {/* شريط التقدم */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full z-20">
        <div 
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{ 
            width: `${(currentSlide / (slides.length - 1)) * 100}%`,
            transition: 'width 5s linear'
          }}
        />
      </div>
    </div>
  );
};