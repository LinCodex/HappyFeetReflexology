import React from 'react';
import { Phone, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BOOKING_URL =
  'https://business.joinsmiley.com/Poughkeepsie-Happy-Feet-Reflexology-oERpY/book-now?rwg_token=AE37R_jMjpZktxas8wxYkmDQ3NByDbLZkVP4uk1A__7g5JEvOsu7oHMFdYPILC2ip5KDUoWo-EBWW83_lswqBRZWjlv0jLQL2g%3D%3D';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=2521+B+South+Rd,+Poughkeepsie,+NY+12601';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer data-surface="dark" className="bg-[#181410] text-[#EFE9DE] border-t border-[#EFE9DE]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Happy Feet Reflexology"
                width={500}
                height={500}
                loading="lazy"
                className="h-12 w-12 object-contain brightness-0 invert opacity-90"
              />
              <span className="text-[16px] font-medium text-[#EFE9DE]">
                Happy Feet Reflexology
              </span>
            </div>
            <p className="text-[14px] leading-[1.6] text-[#C2B9AC] max-w-xs">{t.footer.desc}</p>
          </div>

          {/* Visit & contact */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-[15px] font-medium text-[#EFE9DE]">{t.footer.connect}</h3>
            <ul className="space-y-3 text-[14px] text-[#C2B9AC]">
              <li>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-3 hover:text-[#EFE9DE] transition-colors duration-150"
                >
                  <span className="w-5 flex justify-center pt-0.5 shrink-0 text-[#C9A978]">
                    <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span>
                    2521 B South Rd
                    <br />
                    Poughkeepsie, NY 12601
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:8455918888"
                  className="inline-flex items-center gap-3 hover:text-[#EFE9DE] transition-colors duration-150 tabular-nums"
                >
                  <span className="w-5 flex justify-center shrink-0 text-[#C9A978]">
                    <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span>(845) 591-8888</span>
                </a>
              </li>
              <li>
                <a
                  href="sms:8455918888"
                  className="inline-flex items-center gap-3 hover:text-[#EFE9DE] transition-colors duration-150 tabular-nums"
                >
                  <span className="w-5 flex justify-center shrink-0 text-[#C9A978]">
                    <MessageSquare size={16} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span>{t.footer.textLabel}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & booking */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-[15px] font-medium text-[#EFE9DE]">{t.footer.hours}</h3>
            <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-[#EFE9DE]/10 text-[14px]">
              <span className="text-[#C2B9AC]">{t.footer.everyday}</span>
              <span className="text-[#EFE9DE] font-medium tabular-nums">10:00 AM – 9:00 PM</span>
            </div>
            <p className="text-[13px] text-[#9A9185]">{t.footer.priority}</p>
            <div className="pt-1">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-10 px-4 rounded-[8px] bg-[#221C16] hover:bg-[#2C241C] border border-[#EFE9DE]/15 text-[14px] font-medium text-[#EFE9DE] transition-[background-color,border-color,transform] duration-150 active:scale-[0.98]"
              >
                <span>{t.footer.bookCta}</span>
                <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#EFE9DE]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-[#9A9185]">
          <p>{t.footer.rights}</p>
          <p>{t.footer.cityNote}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
