import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-stone-900">
      {/* Overlay Gradient - Deep & Luxurious */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/20 z-10" />

      {/* Background Video - Streamable Iframe */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
        <iframe
          src="https://streamable.com/e/heuy0z?autoplay=1&muted=1&nocontrols=1&loop=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90"
          allow="autoplay; fullscreen"
          style={{ 
            border: 'none',
            // Logic to simulate object-fit: cover for a 16:9 iframe, zoomed in by ~15%
            width: '115vw',
            height: '64.69vw', // 115 * (9/16)
            minHeight: '115vh',
            minWidth: '204.44vh', // 115 * (16/9)
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full max-w-[90rem] mx-auto px-6 md:px-12 flex flex-col justify-center">
        
        {/* Adjusted padding to push content down below the header logo */}
        <div className="max-w-5xl pt-32 md:pt-48 lg:pt-60">
          {/* Tagline */}
          <div className="inline-flex items-center gap-4 mb-8 md:mb-12 animate-fade-in-up">
            <div className="w-12 md:w-20 h-[1px] bg-pink-300/80"></div>
            <span className="text-pink-100 text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold drop-shadow-lg">
              {t.hero.est}
            </span>
          </div>
          
          {/* Title */}
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] text-white font-serif mb-10 leading-[0.8] tracking-tight animate-fade-in-up delay-100 drop-shadow-2xl">
            {t.hero.happy} <br/>
            <span className="relative inline-block ml-16 md:ml-40">
              <span className="relative z-10 font-serif italic text-pink-50/95 font-light">{t.hero.feet}</span>
              {/* Refined Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-80 md:h-80 bg-pink-500/20 rounded-full blur-[100px] -z-10"></div>
            </span>
          </h1>
          
          {/* Description - Refined & Polished */}
          <div className="flex flex-col gap-8 mt-12 md:mt-16 animate-fade-in-up delay-200 max-w-2xl">
             <p className="text-stone-200 text-lg md:text-2xl font-light leading-relaxed border-l-[3px] border-pink-400/50 pl-8 md:pl-10 drop-shadow-lg">
               {t.hero.desc}
               <span className="block mt-3 text-stone-400 text-base md:text-lg leading-relaxed">
                 {t.hero.subDesc}
               </span>
             </p>
          </div>
        </div>
      </div>

      {/* Refined Scroll Indicator */}
      <button 
        onClick={(e) => scrollToSection(e, 'about')}
        className="absolute bottom-10 right-6 md:bottom-16 md:right-16 z-20 cursor-pointer focus:outline-none group hidden sm:block"
      >
         <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/50 font-bold [writing-mode:vertical-rl] group-hover:text-white transition-colors duration-300">{t.hero.scroll}</span>
            <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[bounceSlow_2s_infinite]"></div>
            </div>
         </div>
      </button>
    </div>
  );
};

export default Hero;