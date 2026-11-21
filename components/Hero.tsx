import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Phone, Pause, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BOOKING_URL =
  'https://business.joinsmiley.com/Poughkeepsie-Happy-Feet-Reflexology-oERpY/book-now?rwg_token=AE37R_jMjpZktxas8wxYkmDQ3NByDbLZkVP4uk1A__7g5JEvOsu7oHMFdYPILC2ip5KDUoWo-EBWW83_lswqBRZWjlv0jLQL2g%3D%3D';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=2521+B+South+Rd,+Poughkeepsie,+NY+12601';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVideoPaused(true);
    }
  }, []);

  return (
    <section
      id="top"
      data-surface="dark"
      className="relative isolate min-h-[100svh] w-full overflow-hidden [clip-path:inset(0)] bg-[#16120E] flex flex-col"
    >
      {/* Background visual strictly contained within hero bounds */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/FootReflexology.png"
          alt=""
          width={800}
          height={534}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-55"
        />
        {!isVideoPaused && (
          <iframe
            src="https://streamable.com/e/heuy0z?autoplay=1&muted=1&nocontrols=1&loop=1"
            title={t.hero.videoTitle}
            tabIndex={-1}
            allow="autoplay; fullscreen"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
            style={{
              width: 'max(100vw, 177.78vh)',
              height: 'max(100vh, 56.25vw)',
            }}
          />
        )}
      </div>

      {/* Left-weighted dark walnut directional scrim for legibility */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(100deg, rgba(22, 18, 14, 0.88) 0%, rgba(22, 18, 14, 0.68) 45%, rgba(22, 18, 14, 0.25) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(22, 18, 14, 0.78) 0%, transparent 32%)',
        }}
      />

      {/* Foreground content */}
      <div className="relative z-20 flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-8 md:pt-32 md:pb-12 flex flex-col justify-between">
        <div className="my-auto max-w-3xl py-8">
          {/* Signature bronze meridian opener */}
          <div className="hero-enter inline-flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A978]" aria-hidden="true" />
            <span className="w-6 h-px bg-[#C9A978]/60" aria-hidden="true" />
            <span className="text-[13px] font-medium text-[#E0C9A2]">{t.hero.est}</span>
          </div>

          <h1 className="hero-enter hero-enter-delay-1 font-display font-normal text-[#EFE9DE] text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.04] tracking-[-0.025em] mt-5">
            {t.hero.headlineLine1}
            <br />
            {t.hero.headlineLine2}
          </h1>

          <p className="hero-enter hero-enter-delay-2 text-[17px] md:text-[19px] leading-[1.55] font-normal text-[#C2B9AC] max-w-[34rem] mt-6">
            {t.hero.desc}
          </p>

          <div className="hero-enter hero-enter-delay-2 mt-8 flex flex-wrap items-center gap-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-6 rounded-[8px] bg-[#EFE9DE] text-[#181410] hover:bg-white text-[15px] font-medium inline-flex items-center gap-2 transition-[background-color,transform] duration-150 active:scale-[0.98]"
            >
              <span>{t.hero.bookCta}</span>
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </a>

            <a
              href="tel:8455918888"
              className="h-12 px-5 rounded-[8px] bg-[#181410]/45 hover:bg-[#181410]/70 border border-[#EFE9DE]/25 text-[#EFE9DE] text-[15px] font-medium inline-flex items-center gap-2 tabular-nums transition-[background-color,border-color,transform] duration-150 active:scale-[0.98]"
            >
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{t.hero.callCta}</span>
            </a>
          </div>
        </div>

        {/* Bottom studio facts & video control */}
        <div className="pt-6 border-t border-[#EFE9DE]/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#C2B9AC] tabular-nums">
            <span>{t.hero.hoursBrief}</span>
            <span aria-hidden="true" className="text-[#C2B9AC]/50">
              ·
            </span>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#EFE9DE] hover:text-white underline decoration-[#EFE9DE]/35 underline-offset-4 transition-colors duration-150"
            >
              {t.hero.addressBrief}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsVideoPaused((prev) => !prev)}
            className="h-9 px-3 rounded-[8px] border border-[#EFE9DE]/20 bg-[#181410]/50 hover:bg-[#181410]/80 text-[13px] text-[#EFE9DE] inline-flex items-center gap-2 transition-[background-color,border-color,transform] duration-150 active:scale-[0.98]"
          >
            {isVideoPaused ? (
              <Play size={14} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Pause size={14} strokeWidth={1.5} aria-hidden="true" />
            )}
            <span>{isVideoPaused ? t.hero.playVideo : t.hero.pauseVideo}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
