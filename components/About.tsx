import React from 'react';
import { Star, ArrowUpRight, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BOOKING_URL =
  'https://business.joinsmiley.com/Poughkeepsie-Happy-Feet-Reflexology-oERpY/book-now?rwg_token=AE37R_jMjpZktxas8wxYkmDQ3NByDbLZkVP4uk1A__7g5JEvOsu7oHMFdYPILC2ip5KDUoWo-EBWW83_lswqBRZWjlv0jLQL2g%3D%3D';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=2521+B+South+Rd,+Poughkeepsie,+NY+12601';

const About: React.FC = () => {
  const { t } = useLanguage();
  const cleanQuote = t.about.quote.replace(/^"|"$/g, '');

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F7F4EE] border-t border-[#1F1B16]/8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Authentic studio photography & structured review */}
          <div className="lg:col-span-6 space-y-4">
            <figure className="overflow-hidden rounded-[14px] border border-[#1F1B16]/10 bg-[#EFE9DF]">
              <img
                src="/ScalpTreatment.jpg"
                alt={t.about.scalpAlt}
                width={1500}
                height={1875}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover block"
              />
            </figure>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
              <div className="sm:col-span-5 overflow-hidden rounded-[12px] border border-[#1F1B16]/10 bg-[#EFE9DF]">
                <img
                  src="/FootReflexology.png"
                  alt={t.about.footAlt}
                  width={800}
                  height={534}
                  loading="lazy"
                  className="w-full h-full min-h-[180px] object-cover block"
                />
              </div>

              <div className="sm:col-span-7 rounded-[12px] border border-[#1F1B16]/10 bg-[#FDFBF7] p-6 flex flex-col justify-between gap-4">
                <div className="flex items-center gap-1" role="img" aria-label={t.about.starsLabel}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      strokeWidth={1.5}
                      fill="#8C6C3D"
                      className="text-[#8C6C3D]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="font-display text-[22px] md:text-[24px] leading-[1.25] text-[#1F1B16]">
                  “{cleanQuote}”
                </blockquote>

                <div className="space-y-0.5">
                  <p className="text-[13px] font-medium text-[#574F45]">{t.about.quoteAuthor}</p>
                  <p className="text-[13px] text-[#70665B]">{t.about.quoteLocation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial copy & verifiable studio details */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C6C3D]" aria-hidden="true" />
              <span className="w-6 h-px bg-[#8C6C3D]/45" aria-hidden="true" />
              <span className="text-[13px] font-medium text-[#8C6C3D]">{t.about.opener}</span>
            </div>

            <h2 className="font-display font-normal text-[#1F1B16] text-[36px] md:text-[48px] leading-[1.08] tracking-[-0.02em] mt-4">
              {t.about.title}
            </h2>

            <div className="mt-6 space-y-4 text-[16px] leading-[1.65] text-[#574F45] max-w-[54ch]">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>

            <div className="mt-10 pt-8 border-t border-[#1F1B16]/10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-[13px] font-medium text-[#70665B]">{t.about.hoursLabel}</div>
                <p className="mt-1.5 text-[15px] font-medium text-[#1F1B16] tabular-nums">
                  {t.about.hoursValue}
                </p>
                <p className="mt-1 text-[13px] text-[#70665B]">{t.about.hoursNote}</p>
              </div>

              <div>
                <div className="text-[13px] font-medium text-[#70665B]">{t.about.locationLabel}</div>
                <p className="mt-1.5 text-[15px] font-medium text-[#1F1B16]">
                  {t.about.locationValue}
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#B54D26] hover:text-[#9C401D] underline-offset-4 hover:underline transition-colors duration-150"
                >
                  <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
                  <span>{t.about.directionsLink}</span>
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-5 rounded-[8px] bg-[#B54D26] hover:bg-[#9C401D] text-[#FDFBF7] text-[14px] font-medium inline-flex items-center gap-2 transition-[background-color,transform] duration-150 active:scale-[0.98]"
              >
                <span>{t.about.bookLink}</span>
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
