import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const GrandOpeningBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsRendered(false), 400);
  };

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('consultation');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (!isRendered) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-[100] transition-all duration-400 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Top edge glow */}
      <div className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(192,158,107,0.4) 30%, rgba(216,197,160,0.6) 50%, rgba(192,158,107,0.4) 70%, transparent)',
        }}
      />

      {/* Main banner */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #2A1F10 0%, #42311A 25%, #5A4324 50%, #42311A 75%, #2A1F10 100%)',
      }}>


        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative flex items-center justify-center px-4 py-4 md:py-6">
          {/* Content */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 pr-6 md:pr-10 text-center">
            {/* Text content */}
            <div className="flex items-center gap-1.5 md:gap-4 flex-wrap justify-center">
              <span className="text-pink-200/80 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
                ✦
              </span>
              <span className="font-serif text-white text-sm md:text-base lg:text-lg tracking-wide">
                {t.banner.grandOpening} <span className="text-pink-300 italic font-light ml-1">{t.banner.promotion}</span>
              </span>
              <span className="text-pink-300 text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-pink-400/30 bg-pink-400/10">
                {t.banner.date}
              </span>
              <span className="text-pink-200/80 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">
                ✦
              </span>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-bold text-pink-100 bg-transparent border border-pink-400/30 hover:bg-pink-400/10 px-4 py-1.5 rounded-full transition-all duration-300 flex-shrink-0"
              >
                {t.banner.viewPromotion}
              </button>
              <button
                onClick={scrollToBooking}
                className="hidden md:flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-bold text-stone-900 bg-pink-300 hover:bg-white px-4 py-1.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-pink-400/20 flex-shrink-0 group"
              >
                {t.banner.reserveNow}
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 md:top-1/2 md:-translate-y-1/2 text-pink-400/60 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="Dismiss banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Full Screen Promotion Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fade-in" onClick={() => setIsModalOpen(false)}>
          <div className="relative max-w-full max-h-full flex items-center justify-center animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-4 -right-4 md:-top-5 md:-right-5 text-white bg-black/60 hover:bg-black border border-white/20 p-2 rounded-full transition-all z-10 shadow-xl backdrop-blur-md group"
              aria-label="Close modal"
            >
              <X size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <img 
              src="/promotionbanner.jpg" 
              alt={t.banner.promotion} 
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default GrandOpeningBanner;
