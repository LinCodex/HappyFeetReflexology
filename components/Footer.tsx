import React from 'react';
import { Instagram, Facebook, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white text-black py-20 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          
          <div className="space-y-8">
            <div className="h-20 md:h-24 inline-block">
              <img src="https://i.ibb.co/S75dKJg8/image.png" alt="Happy Feet Reflexology Logo" className="h-full w-auto object-contain" />
            </div>
            <p className="text-stone-400 text-sm max-w-xs leading-relaxed font-light">
              {t.footer.desc}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-black font-serif text-2xl">{t.footer.connect}</h4>
            <div className="space-y-4 text-sm font-light text-stone-500">
               <div className="flex items-start gap-4">
                 <MapPin className="w-5 h-5 text-pink-400 mt-1 shrink-0" />
                 <p>2040 US-9 S Suite 2040-103<br/>Old Bridge, NJ 08857</p>
               </div>
               <div className="flex items-center gap-4">
                 <Phone className="w-5 h-5 text-pink-400 shrink-0" />
                 <p className="tracking-widest">732.838.3888</p>
               </div>
               <div className="flex items-center gap-4">
                 <MessageSquare className="w-5 h-5 text-pink-400 shrink-0" />
                 <p className="tracking-widest">908.570.5655 <span className="text-[10px] uppercase font-bold opacity-40 ml-2">({t.nav.text})</span></p>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-black font-serif text-2xl">{t.footer.hours}</h4>
            <div className="space-y-3 text-sm font-light text-stone-500">
               <div className="flex justify-between border-b border-stone-50 pb-2">
                 <span>{t.footer.mon_sat}</span>
                 <span className="text-black font-bold tracking-widest">10:00 AM – 9:00 PM</span>
               </div>
               <div className="flex justify-between border-b border-stone-50 pb-2">
                 <span>{t.footer.sun}</span>
                 <span className="text-black font-bold tracking-widest">10:00 AM – 8:00 PM</span>
               </div>
               <p className="text-pink-400 text-[9px] mt-4 uppercase tracking-[0.3em] font-bold">{t.footer.priority}</p>
            </div>
          </div>

        </div>
        
        <div className="border-t border-stone-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-widest text-stone-300 font-bold">{t.footer.rights}</p>
          <div className="flex gap-8">
            <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer transition-all" />
            <Facebook className="w-5 h-5 hover:text-pink-400 cursor-pointer transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;