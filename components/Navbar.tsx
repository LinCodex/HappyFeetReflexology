import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Hysteresis: switch to scrolled at 50, switch back to top at 20
          if (currentScrollY > 50) {
            setIsScrolled(true);
          } else if (currentScrollY < 20) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
    setMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // Action Button Component for consistency
  const ActionButton = ({ icon: Icon, href, label }: { icon: any, href: string, label: string }) => (
    <a
      href={href}
      target={href.startsWith('http') ? "_blank" : undefined}
      rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
      className={`
        group relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300
        ${isScrolled
          ? 'bg-stone-100 text-stone-600 hover:bg-black hover:text-white'
          : 'bg-white/10 text-white hover:bg-white hover:text-black backdrop-blur-md'
        }
      `}
      aria-label={label}
    >
      <Icon size={16} />
      {/* Tooltip */}
      <span className={`
        absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded
        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap
        ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'}
      `}>
        {label}
      </span>
    </a>
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 md:transition-[padding] md:duration-500 md:ease-[cubic-bezier(0.4,0,0.2,1)] flex justify-center transform-gpu will-change-transform ${isScrolled ? 'py-4' : 'py-6 md:py-8 lg:py-10'
          }`}
      >
        <div
          style={{ willChange: 'width, background-color, padding, border-radius, box-shadow' }}
          className={`
            md:transition-[width,background-color,padding,border-radius,box-shadow,border] md:duration-500 md:ease-[cubic-bezier(0.4,0,0.2,1)] flex justify-between items-center transform-gpu backface-hidden translate-z-0
            ${isScrolled
              ? 'w-[95%] md:w-[1100px] bg-white/60 backdrop-blur-3xl rounded-full px-6 md:px-8 md:pl-10 py-3 shadow-2xl border border-white/40 ring-1 ring-white/10'
              : 'w-full max-w-7xl px-6 md:px-8 bg-transparent'
            }
          `}
        >
          {/* Logo Area */}
          <div
            className={`relative cursor-pointer group flex items-center md:transition-[height] md:duration-500 overflow-hidden ${isScrolled ? 'h-10 md:h-12 w-auto' : 'h-20 md:h-44 lg:h-56'
              }`}
            onClick={scrollToTop}
          >
            <img
              src="/logo.png"
              alt="Happy Feet Reflexology Logo"
              className={`h-full w-auto object-contain md:transition-all md:duration-700 transform-gpu ${isScrolled ? 'brightness-100 hover:scale-105' : 'brightness-0 invert hover:scale-105'
                }`}
            />
          </div>

          {/* Desktop Dock Actions */}
          <div className="hidden md:flex items-center">

            {/* Navigation Links */}
            <div className={`flex items-center gap-8 mr-8 transition-all duration-500 ${isScrolled ? 'translate-x-0' : 'translate-x-0'}`}>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={`text-[11px] uppercase tracking-[0.25em] font-bold hover:text-pink-400 transition-colors ${isScrolled ? 'text-stone-600' : 'text-white'}`}>{t.nav.about}</a>
              <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className={`text-[11px] uppercase tracking-[0.25em] font-bold hover:text-pink-400 transition-colors ${isScrolled ? 'text-stone-600' : 'text-white'}`}>{t.nav.treatments}</a>
            </div>

            {/* Divider */}
            <div className={`h-8 w-[1px] mx-2 transition-colors duration-500 ${isScrolled ? 'bg-stone-200' : 'bg-white/20'}`}></div>

            {/* Quick Actions Group */}
            <div className="flex items-center gap-3 mx-6">
              <ActionButton
                icon={Phone}
                href="tel:7328383888"
                label={t.nav.call}
              />
              <ActionButton
                icon={MessageSquare}
                href="sms:9085705655"
                label={t.nav.text}
              />
              <ActionButton
                icon={MapPin}
                href="https://www.google.com/maps/dir/?api=1&destination=2040+US-9+S+Suite+2040-103,+Old+Bridge,+NJ+08857"
                label={t.nav.maps}
              />
              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className={`
                  group relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                  ${isScrolled
                    ? 'bg-stone-100 text-stone-600 hover:bg-black hover:text-white'
                    : 'bg-white/10 text-white hover:bg-white hover:text-black backdrop-blur-md'
                  }
                `}
                aria-label="Switch Language"
              >
                <Globe size={16} />
                <span className={`
                  absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded
                  opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap
                  ${isScrolled ? 'bg-black text-white' : 'bg-white text-black'}
                `}>
                  {language === 'en' ? '中文' : 'EN'}
                </span>
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="#consultation"
              onClick={(e) => scrollToSection(e, 'consultation')}
              className={`
                px-8 py-3 rounded-full text-[11px] uppercase tracking-[0.25em] font-bold transition-all shadow-lg
                ${isScrolled
                  ? 'bg-black text-white hover:bg-pink-400 hover:text-black hover:shadow-pink-200/50'
                  : 'bg-white text-black border border-white hover:bg-pink-400 hover:border-pink-400'
                }
              `}
            >
              {t.nav.book}
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors font-bold text-xs uppercase tracking-widest ${isScrolled ? 'text-black bg-stone-100' : 'text-white bg-white/10'}`}
            >
              {language === 'en' ? 'CN' : 'EN'}
            </button>
            <button className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isScrolled ? 'bg-stone-100 text-black' : 'bg-white/10 text-white'}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-10 animate-fade-in md:hidden">
          <div className="h-40 mb-4">
            <img src="/logo.png" alt="Logo" className="h-full w-auto" />
          </div>

          <div className="flex flex-col items-center gap-8">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-4xl font-serif text-stone-400 hover:text-black transition-colors">{t.nav.story}</a>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="text-4xl font-serif text-stone-400 hover:text-black transition-colors">{t.nav.treatments}</a>
          </div>

          <div className="w-16 h-[1px] bg-stone-100"></div>

          {/* Mobile Quick Actions */}
          <div className="flex items-center gap-6">
            <a href="tel:7328383888" className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-black group-hover:text-white transition-all">
                <Phone size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t.nav.call}</span>
            </a>
            <a href="sms:9085705655" className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-black group-hover:text-white transition-all">
                <MessageSquare size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t.nav.text}</span>
            </a>
            <a href="https://www.google.com/maps/dir/?api=1&destination=2040+US-9+S+Suite+2040-103,+Old+Bridge,+NJ+08857" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-black group-hover:text-white transition-all">
                <MapPin size={20} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t.nav.maps}</span>
            </a>
          </div>

          <a href="#consultation" onClick={(e) => scrollToSection(e, 'consultation')} className="px-12 py-5 bg-black rounded-full text-white uppercase tracking-widest font-bold text-sm shadow-2xl mt-4">
            {t.nav.book}
          </a>

          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 right-8 text-stone-900 bg-stone-100 p-4 rounded-full hover:bg-pink-100 transition-colors">
            <X size={32} />
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;