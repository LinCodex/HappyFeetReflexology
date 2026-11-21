import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Phone, MessageSquare, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BOOKING_URL =
  'https://business.joinsmiley.com/Poughkeepsie-Happy-Feet-Reflexology-oERpY/book-now?rwg_token=AE37R_jMjpZktxas8wxYkmDQ3NByDbLZkVP4uk1A__7g5JEvOsu7oHMFdYPILC2ip5KDUoWo-EBWW83_lswqBRZWjlv0jLQL2g%3D%3D';
const MAPS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=2521+B+South+Rd,+Poughkeepsie,+NY+12601';

let supportsDisplayTransition: boolean | undefined;

function canTransitionDisplay(): boolean {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (!window.CSS?.supports?.('transition-behavior', 'allow-discrete') || !document.body) {
    return false;
  }
  const probe = document.createElement('div');
  probe.style.cssText = 'transition: display 1s allow-discrete !important; display: block;';
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = 'none';
  supportsDisplayTransition = getComputedStyle(probe).display === 'block';
  probe.remove();
  return supportsDisplayTransition;
}

function supportsTopLayerExit(): boolean {
  return window.CSS?.supports?.('overlay', 'auto') && canTransitionDisplay();
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(async () => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open) return;

    if (!supportsTopLayerExit()) {
      dialog.setAttribute('data-closing', '');
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((animation) => animation.finished)),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);
      }
      if (!dialog.hasAttribute('data-closing')) return;
      dialog.removeAttribute('data-closing');
    }

    if (dialog.open) {
      dialog.close();
    }
  }, []);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.removeAttribute('data-closing');
    dialog.showModal();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      void closeMenu();
    };

    dialog.addEventListener('cancel', handleCancel);

    let cleanupLightDismiss: (() => void) | undefined;
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      const isOutside = (event: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        );
      };
      let pressedOutside = false;
      const handlePointerDown = (event: PointerEvent) => {
        pressedOutside = isOutside(event);
      };
      const handlePointerUp = (event: PointerEvent) => {
        if (pressedOutside && isOutside(event)) {
          void closeMenu();
        }
        pressedOutside = false;
      };
      dialog.addEventListener('pointerdown', handlePointerDown);
      dialog.addEventListener('pointerup', handlePointerUp);
      cleanupLightDismiss = () => {
        dialog.removeEventListener('pointerdown', handlePointerDown);
        dialog.removeEventListener('pointerup', handlePointerUp);
      };
    }

    const handleResize = () => {
      if (window.innerWidth >= 768 && dialog.open) {
        dialog.removeAttribute('data-closing');
        dialog.close();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      dialog.removeEventListener('cancel', handleCancel);
      cleanupLightDismiss?.();
      window.removeEventListener('resize', handleResize);
    };
  }, [closeMenu]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 64;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    void closeMenu();
  };

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  const iconButtonClass = isScrolled
    ? 'text-[#574F45] hover:text-[#1F1B16] hover:bg-[#EFE9DF]'
    : 'text-[#EFE9DE]/85 hover:text-[#EFE9DE] hover:bg-[#EFE9DE]/10';

  const tooltipClass = isScrolled
    ? 'bg-[#181410] text-[#EFE9DE]'
    : 'bg-[#FDFBF7] text-[#1F1B16]';

  return (
    <header>
      <a href="#main-content" className="skip-link visually-hidden">
        {t.nav.skipToContent}
      </a>

      <nav
        aria-label="Primary"
        data-surface={isScrolled ? 'light' : 'dark'}
        className={`fixed top-0 left-0 w-full h-16 z-50 border-b transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'bg-[#F7F4EE]/95 backdrop-blur-md border-[#1F1B16]/10 text-[#1F1B16]'
            : 'bg-[#16120E]/35 backdrop-blur-sm border-[#EFE9DE]/10 text-[#EFE9DE]'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 flex items-center justify-between gap-4">
          <a
            href="#top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-3 py-1 rounded-[8px] shrink-0"
          >
            <img
              src="/logo.png"
              alt=""
              width={500}
              height={500}
              className={`h-10 w-10 object-contain transition-[filter,opacity] duration-200 ${
                isScrolled ? 'brightness-100 opacity-100' : 'brightness-0 invert opacity-95'
              }`}
            />
            <span className="text-[15px] font-medium tracking-normal whitespace-nowrap">
              Happy Feet Reflexology
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="#about"
              onClick={(e) => scrollToSection(e, 'about')}
              className={`px-3 py-2 rounded-[8px] text-[14px] font-medium transition-colors duration-150 ${
                isScrolled
                  ? 'text-[#574F45] hover:text-[#1F1B16] hover:bg-[#EFE9DF]'
                  : 'text-[#EFE9DE]/85 hover:text-[#EFE9DE] hover:bg-[#EFE9DE]/10'
              }`}
            >
              {t.nav.about}
            </a>

            <div
              className={`w-px h-5 mx-1 ${isScrolled ? 'bg-[#1F1B16]/10' : 'bg-[#EFE9DE]/15'}`}
              aria-hidden="true"
            />

            <div className="flex items-center gap-1">
              {[
                { icon: Phone, href: 'tel:8455918888', label: t.nav.call, external: false },
                { icon: MessageSquare, href: 'sms:8455918888', label: t.nav.text, external: false },
                { icon: MapPin, href: MAPS_URL, label: t.nav.maps, external: true },
              ].map(({ icon: Icon, href, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className={`group relative flex items-center justify-center h-9 w-9 rounded-[8px] transition-colors duration-150 ${iconButtonClass}`}
                >
                  <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                  <span
                    className={`pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-[6px] text-[12px] leading-none font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 ${tooltipClass}`}
                  >
                    {label}
                  </span>
                </a>
              ))}

              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={`${t.nav.switchLang} (${t.nav.switchLangAria})`}
                className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-[8px] text-[13px] font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.98] ${iconButtonClass}`}
              >
                <Globe size={15} strokeWidth={1.5} aria-hidden="true" />
                <span>{t.nav.switchLang}</span>
              </button>
            </div>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-1 h-9 px-4 rounded-[8px] text-[14px] font-medium inline-flex items-center transition-[background-color,color,transform] duration-150 active:scale-[0.98] ${
                isScrolled
                  ? 'bg-[#B54D26] text-[#FDFBF7] hover:bg-[#9C401D]'
                  : 'bg-[#EFE9DE] text-[#181410] hover:bg-white'
              }`}
            >
              {t.nav.book}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-1.5">
            <a
              href="tel:8455918888"
              aria-label={t.nav.call}
              className={`min-w-[40px] min-h-[40px] rounded-[8px] flex items-center justify-center transition-colors duration-150 ${iconButtonClass}`}
            >
              <Phone size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.maps}
              className={`min-w-[40px] min-h-[40px] rounded-[8px] flex items-center justify-center transition-colors duration-150 ${iconButtonClass}`}
            >
              <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={openMenu}
              aria-label={t.nav.menu}
              className={`min-w-[40px] min-h-[40px] rounded-[8px] flex items-center justify-center transition-colors duration-150 ${iconButtonClass}`}
            >
              <Menu size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <dialog
        ref={dialogRef}
        className="mobile-nav-dialog"
        aria-labelledby="mobile-nav-title"
        {...({ closedby: 'any' } as Record<string, string>)}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-[#1F1B16]/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt=""
              width={500}
              height={500}
              className="h-8 w-8 object-contain"
            />
            <h2 id="mobile-nav-title" className="text-[15px] font-medium text-[#1F1B16]">
              Happy Feet Reflexology
            </h2>
          </div>
          <button
            type="button"
            onClick={() => void closeMenu()}
            aria-label={t.nav.closeMenu}
            autoFocus
            className="min-w-[40px] min-h-[40px] rounded-[8px] flex items-center justify-center text-[#574F45] hover:text-[#1F1B16] hover:bg-[#EFE9DF] transition-colors duration-150"
          >
            <X size={18} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between gap-8">
          <div className="space-y-1">
            <div className="pb-3 mb-2 border-b border-[#1F1B16]/10">
              <a
                href="#about"
                onClick={(e) => scrollToSection(e, 'about')}
                className="flex items-center justify-between px-3 py-3 rounded-[8px] text-[16px] font-medium text-[#1F1B16] hover:bg-[#EFE9DF] transition-colors duration-150"
              >
                <span>{t.nav.story}</span>
              </a>
            </div>
            <a
              href="tel:8455918888"
              className="flex items-center gap-3 px-3 py-3 rounded-[8px] text-[15px] text-[#574F45] hover:text-[#1F1B16] hover:bg-[#EFE9DF] transition-colors duration-150 tabular-nums"
            >
              <Phone size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{t.hero.callCta}</span>
            </a>
            <a
              href="sms:8455918888"
              className="flex items-center gap-3 px-3 py-3 rounded-[8px] text-[15px] text-[#574F45] hover:text-[#1F1B16] hover:bg-[#EFE9DF] transition-colors duration-150 tabular-nums"
            >
              <MessageSquare size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{t.footer.textLabel}</span>
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-3 rounded-[8px] text-[15px] text-[#574F45] hover:text-[#1F1B16] hover:bg-[#EFE9DF] transition-colors duration-150"
            >
              <MapPin size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{t.about.directionsLink}</span>
            </a>
          </div>

          <div className="space-y-3 pt-6 border-t border-[#1F1B16]/10">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`${t.nav.switchLang} (${t.nav.switchLangAria})`}
              className="w-full h-11 px-4 rounded-[8px] border border-[#1F1B16]/15 bg-[#F7F4EE] hover:bg-[#EFE9DF] text-[14px] font-medium text-[#1F1B16] inline-flex items-center justify-center gap-2 transition-[background-color,transform] duration-150 active:scale-[0.98]"
            >
              <Globe size={16} strokeWidth={1.5} aria-hidden="true" />
              <span>{t.nav.switchLang}</span>
            </button>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => void closeMenu()}
              className="w-full h-11 px-4 rounded-[8px] bg-[#B54D26] hover:bg-[#9C401D] text-[#FDFBF7] text-[14px] font-medium inline-flex items-center justify-center transition-[background-color,transform] duration-150 active:scale-[0.98]"
            >
              {t.nav.book}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
};

export default Navbar;
