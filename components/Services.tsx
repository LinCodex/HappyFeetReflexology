import React, { useState } from 'react';
import { SERVICES, CategorizedService } from '../constants';
import { Clock, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  
  // Group services by category
  const groupedServices = SERVICES.reduce((acc, service) => {
    // Determine category based on language
    const cat = language === 'zh' ? service.categoryZh : service.category;
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(service);
    return acc;
  }, {} as Record<string, CategorizedService[]>);

  const categories = Object.keys(groupedServices);
  
  // Set the first category as open by default so the page isn't empty
  const [openCategory, setOpenCategory] = useState<string | null>(categories[0]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const toggleCategory = (category: string) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-stone-50 relative overflow-hidden min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 md:mb-24 text-center">
          <span className="text-pink-500 uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block animate-fade-in">{t.services.menu}</span>
          <h2 className="text-5xl md:text-6xl text-black font-serif mb-6">{t.services.title}</h2>
          <p className="text-stone-500 font-light max-w-lg mx-auto">{t.services.subtitle}</p>
        </div>

        <div className="flex flex-col">
          {categories.map((category) => {
            const categoryServices = groupedServices[category];
            const categoryImage = categoryServices[0].image;
            const isOpen = openCategory === category;

            return (
              <div key={category} className="border-b border-stone-200 last:border-0 group">
                
                {/* Accordion Header */}
                <button 
                  onClick={() => toggleCategory(category)}
                  className="w-full py-8 md:py-10 flex items-center justify-between text-left focus:outline-none group-hover:bg-white/50 transition-colors rounded-2xl px-4 -mx-4"
                >
                  <div className="flex items-center gap-6">
                     <span className={`text-3xl md:text-5xl font-serif transition-colors duration-300 ${isOpen ? 'text-black' : 'text-stone-400 group-hover:text-stone-600'}`}>
                       {category}
                     </span>
                     {isOpen && <span className="hidden md:inline-flex px-3 py-1 bg-pink-100 text-pink-600 text-[10px] uppercase font-bold tracking-widest rounded-full">{categoryServices.length} {t.services.options}</span>}
                  </div>
                  
                  <div className={`
                    w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500
                    ${isOpen ? 'bg-black text-white border-black rotate-180 shadow-lg' : 'bg-transparent text-stone-300 border-stone-200 group-hover:border-stone-400 group-hover:text-stone-500'}
                  `}>
                    <ChevronDown size={24} />
                  </div>
                </button>

                {/* Accordion Content */}
                <div 
                  className={`
                    grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-12' : 'grid-rows-[0fr] opacity-0 pb-0'}
                  `}
                >
                   <div className="overflow-hidden">
                     <div className="flex flex-col lg:flex-row gap-10 pt-4 px-2">
                        
                        {/* Left: Featured Image */}
                        <div className="w-full lg:w-5/12 shrink-0">
                           <div className="relative aspect-[3/4] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                              <img 
                                src={categoryImage} 
                                alt={category} 
                                className="w-full h-full object-cover animate-fade-in scale-105" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                              <div className="absolute bottom-6 left-6 text-white">
                                 <div className="flex items-center gap-2 mb-2 text-pink-300">
                                   <Sparkles size={16} />
                                   <span className="text-[10px] uppercase tracking-widest font-bold">{t.services.recommended}</span>
                                 </div>
                                 <p className="font-serif text-2xl leading-none">{category}</p>
                              </div>
                           </div>
                        </div>

                        {/* Right: Service List */}
                        <div className="w-full lg:w-7/12 flex flex-col gap-4">
                           {categoryServices.map((service, idx) => (
                             <div 
                               key={service.id} 
                               className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow group/item"
                               style={{ animationDelay: `${idx * 100}ms` }}
                             >
                               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                  <div className="space-y-1">
                                    <h4 className="text-lg font-bold text-stone-900 group-hover/item:text-pink-500 transition-colors">
                                      {language === 'zh' ? service.nameZh : service.name}
                                    </h4>
                                    <p className="text-xs font-light text-stone-500 leading-relaxed max-w-sm">
                                      {language === 'zh' ? service.descriptionZh : service.description}
                                    </p>
                                  </div>
                                  
                                  <div className="flex items-center justify-between sm:justify-end gap-6 min-w-[140px] pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-50">
                                     <div className="text-right">
                                       <span className="block text-xl font-serif font-bold text-black">${service.price}{t.services.price}</span>
                                       <div className="flex items-center gap-1 text-stone-400 justify-end">
                                          <Clock size={10} />
                                          <span className="text-[9px] font-bold uppercase tracking-widest">{service.duration}{t.services.duration}</span>
                                       </div>
                                     </div>
                                     <button 
                                        onClick={(e) => scrollToSection(e, 'consultation')}
                                        className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-900 hover:bg-black hover:text-white transition-all shadow-sm"
                                     >
                                        <ArrowRight size={16} />
                                     </button>
                                  </div>
                               </div>
                             </div>
                           ))}
                        </div>

                     </div>
                   </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;