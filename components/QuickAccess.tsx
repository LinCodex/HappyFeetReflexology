import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';

const QuickAccess: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/50 animate-fade-in-up hover:scale-105 transition-transform duration-300">
      
      {/* Call Button - Prominent */}
      <a 
        href="tel:7328383888"
        className="flex items-center gap-3 px-6 py-3 rounded-full bg-stone-900 text-white hover:bg-pink-500 transition-colors shadow-lg group"
      >
        <Phone size={18} className="text-pink-200 group-hover:text-white transition-colors" fill="currentColor" />
        <span className="text-[11px] font-bold uppercase tracking-widest hidden sm:inline">Call</span>
      </a>

      {/* Vertical Divider */}
      <div className="w-[1px] h-8 bg-stone-200/50 mx-1"></div>

      {/* Text Button */}
      <a 
        href="sms:9085705655"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white text-stone-600 hover:bg-pink-100 hover:text-pink-600 transition-all border border-stone-100 shadow-sm"
        aria-label="Text Us"
      >
        <MessageSquare size={20} />
        {/* Tooltip for desktop */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Text Us
        </span>
      </a>

      {/* Navigate Button */}
      <a 
        href="https://www.google.com/maps/dir/?api=1&destination=2040+US-9+S+Suite+2040-103,+Old+Bridge,+NJ+08857"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white text-stone-600 hover:bg-pink-100 hover:text-pink-600 transition-all border border-stone-100 shadow-sm"
        aria-label="Get Directions"
      >
        <MapPin size={20} />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Navigate
        </span>
      </a>

    </div>
  );
};

export default QuickAccess;