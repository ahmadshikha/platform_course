import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import carouselBg1 from "@/assets/حلب.jpg";
import carouselBg2 from "@/assets/IMG_7230 copy.jpg";
import carouselBg3 from "@/assets/حماه.jpg";
import carouselBg4 from "@/assets/carusel4.jpg";

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "حلب مدينتنا",
      subtitle: "نقدم لكم أفضل البرامج التعليمية والأنشطة الثقافية",
      cta: " ",
      bgImage: carouselBg1,
      textPosition: "left"
    },
    {
      title: "دمشق مدينتنا",
      subtitle: " معا نبني",
      cta: " ",
      bgImage: carouselBg2,
      textPosition: "right"
    },
    {
      title: "حماة مدينتنا",
      subtitle: "نطور مهارات الشباب ونعزز قدراتهم الإبداعية",
      cta: "ابدأ الرحلة",
      bgImage: carouselBg3,
      textPosition: "left"
    },
    {
      title: " مدرسة الحياة و الجمال",
      subtitle: "انضم إلى مجتمعنا المتعاون والمبدع",
      cta: "",
      bgImage: carouselBg4,
      textPosition: "right"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // تغيير الشريحة كل 5 ثواني

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
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
            <div className={`absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 ${
              slide.textPosition === "left" ? "" : "bg-gradient-to-l"
            }`} />
            
            <div className={`relative z-10 container mx-auto px-4 h-full flex items-center ${
              slide.textPosition === "left" ? "justify-start" : "justify-end"
            }`}>
              <div className={`max-w-md text-white animate-fade-in-up ${
                slide.textPosition === "left" ? "text-right ml-8" : "text-left mr-8"
              }`}>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl lg:text-2xl mb-8 leading-relaxed font-light">
                  {slide.subtitle}
                </p>
                <div className={slide.textPosition === "left" ? "flex justify-end" : "flex justify-start"}>
                  {/* <Button 
                    variant="secondary" 
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    {slide.cta} 
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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