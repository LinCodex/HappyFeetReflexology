import React from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
             <div className="absolute -top-16 -left-16 w-80 h-80 bg-pink-50 rounded-full blur-[100px] -z-0"></div>
             
             <div className="relative z-10 group">
               <div className="absolute inset-0 border border-black/5 translate-x-4 translate-y-4 rounded-3xl transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
               <img 
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=1000" 
                  alt="Scalp Ritual" 
                  className="w-full h-[500px] md:h-[650px] object-cover rounded-3xl shadow-xl transition-all duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-12 bg-black text-white p-8 md:p-10 rounded-2xl shadow-2xl max-w-[280px]">
                   <div className="flex gap-1 mb-4">
                     {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#f472b6" className="text-pink-400" />)}
                   </div>
                   <p className="font-serif text-2xl md:text-3xl leading-snug">{t.about.quote}</p>
                   <p className="text-[10px] uppercase tracking-[0.3em] font-bold mt-4 text-pink-300">{t.about.customer}</p>
                </div>
             </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="inline-block px-3 py-1 bg-pink-50 rounded-full mb-6">
              <span className="text-pink-500 uppercase tracking-[0.3em] text-[10px] font-bold">{t.about.badge}</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-black mb-8 leading-[0.9]">
              {t.about.title1} <br/>
              <span className="italic text-stone-400">{t.about.title2}</span>
            </h2>
            
            <div className="flex gap-8 mb-12">
               <div className="w-[1.5px] bg-pink-200 h-32"></div>
               <div className="space-y-6">
                 <p className="text-stone-600 text-lg font-light leading-relaxed">
                   {t.about.p1}
                 </p>
                 <p className="text-stone-500 text-base font-light leading-relaxed">
                   {t.about.p2}
                 </p>
               </div>
            </div>

            <div className="flex flex-wrap items-center gap-8 border-t border-stone-100 pt-10">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-stone-100 overflow-hidden shadow-sm">
                       <img src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-full h-full object-cover grayscale" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-pink-400 text-black flex items-center justify-center text-[10px] font-bold shadow-sm">
                    50+
                  </div>
               </div>
               <div>
                 <p className="font-serif text-xl text-black leading-tight">{t.about.statTitle}</p>
                 <p className="text-[10px] uppercase tracking-widest text-pink-500 font-bold">{t.about.statSub}</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;