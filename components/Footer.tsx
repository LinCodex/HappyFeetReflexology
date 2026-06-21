import React, { useState, useEffect } from 'react';
import { Instagram, Facebook, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  // TEAM_034: Redesign footer to use deep dark walnut wood (pink-950) background and gold/cream accents
  return (
    <footer className="bg-pink-950 text-pink-100 py-20 border-t border-pink-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">

          <div className="space-y-8">
            <div className="h-20 md:h-24 inline-block">
              {/* Overwritten logo.png automatically loads in natural gold/bronze branding here */}
              <img src="/logo.png" alt="Happy Feet Reflexology Logo" className="h-full w-auto object-contain" />
            </div>
            <p className="text-pink-200/60 text-sm max-w-xs leading-relaxed font-light">
              {t.footer.desc}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-serif text-2xl">{t.footer.connect}</h4>
            <div className="space-y-4 text-sm font-light text-pink-200/80">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-pink-400 mt-1 shrink-0" />
                <p>2521 B South Rd<br />Poughkeepsie, NY 12601</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-pink-400 shrink-0" />
                <p className="tracking-widest">845.591.8888</p>
              </div>
              <div className="flex items-center gap-4">
                <MessageSquare className="w-5 h-5 text-pink-400 shrink-0" />
                <p className="tracking-widest">845.591.8888 <span className="text-[10px] uppercase font-bold opacity-40 ml-2">({t.nav.text})</span></p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-serif text-2xl">{t.footer.hours}</h4>
            <div className="space-y-3 text-sm font-light text-pink-200/80">
              <div className="flex justify-between border-b border-pink-900/30 pb-2">
                <span>{t.footer.everyday}</span>
                <span className="text-white font-bold tracking-widest">10:00 AM – 9:00 PM</span>
              </div>
              <p className="text-pink-400 text-[9px] mt-4 uppercase tracking-[0.3em] font-bold">{t.footer.priority}</p>
            </div>
          </div>

        </div>

        <div className="border-t border-pink-900/40 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-widest text-pink-300/40 font-bold">{t.footer.rights}</p>
          <div className="flex gap-8">
            <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer text-pink-200/80 transition-all" />
            <Facebook className="w-5 h-5 hover:text-pink-400 cursor-pointer text-pink-200/80 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;