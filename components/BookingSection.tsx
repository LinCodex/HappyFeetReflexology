import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { SERVICES, CategorizedService } from '../constants';
import { BookingStatus } from '../types';
import { CheckCircle, Loader2, ChevronLeft, ChevronRight, Clock, MapPin, ChevronDown, ChevronUp, User, Mail, Phone, Calendar, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import emailjs from '@emailjs/browser';

// EmailJS Config
const SERVICE_ID = "service_l8y1jlr";
const TEMPLATE_ID = "template_dzyrezg";
const PUBLIC_KEY = "_1cEnB8RnVwD4SCW-";

const BookingSection: React.FC<{ initialServiceId?: string | null }> = ({ initialServiceId }) => {
  const [status, setStatus] = useState<BookingStatus>(BookingStatus.IDLE);
  const [selectedService, setSelectedService] = useState<CategorizedService>(SERVICES[2]); // Default to 1hr Foot
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t, language } = useLanguage();

  // Watch for external selection changes
  React.useEffect(() => {
    if (initialServiceId) {
      const service = SERVICES.find(s => s.id === initialServiceId);
      if (service) {
        setSelectedService(service);
        // Reset steps if we just switched service from the menu
        setBookingStep(0);
        setSelectedTime('');
      }
    }
  }, [initialServiceId]);

  // Scroll to top of section on success to prevent falling through to footer
  React.useEffect(() => {
    if (status === BookingStatus.SUCCESS) {
      const element = document.getElementById('consultation');
      if (element) {
        // Use a slight timeout to ensure DOM update
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [status]);

  // New State for Multi-step Booking
  const [bookingStep, setBookingStep] = useState<0 | 1>(0); // 0: Date/Time, 1: Details

  interface GuestDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    comments?: string;
  }

  const [guestDetails, setGuestDetails] = useState<GuestDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comments: ''
  });

  // Group services for the dropdown
  const groupedServices = SERVICES.reduce((acc, service) => {
    const cat = language === 'zh' ? service.categoryZh : service.category;
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(service);
    return acc;
  }, {} as Record<string, CategorizedService[]>);

  // Helper to generate time slots based on day of week
  const getTimeSlotsForDate = (dateStr: string) => {
    if (!dateStr) return [];

    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    const day = date.getDay(); // 0 = Sun

    // Store Hours:
    // Mon-Sat (1-6): 10:00 AM - 9:00 PM
    // Sun (0): 10:00 AM - 8:00 PM
    const isSunday = day === 0;
    const startHour = 10;
    const closeHour = isSunday ? 20 : 21; // 8 PM or 9 PM

    // Generate slots up to 30 mins before closing to allow for minimum service
    // Last full hour slot is (closeHour - 1):00 and (closeHour - 1):30
    const lastStartHour = closeHour - 1;

    const slots = [];
    const now = new Date();
    const isToday = dateStr === now.toISOString().split('T')[0];

    for (let h = startHour; h <= lastStartHour; h++) {
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = h > 12 ? h - 12 : h === 12 ? 12 : h;

      const time1 = `${displayH}:00 ${period}`;
      const time2 = `${displayH}:30 ${period}`;

      const checkTime = (t: string) => {
        if (!isToday) return true;

        let [timePart, periodPart] = t.split(' ');
        let [hoursStr, minutesStr] = timePart.split(':');
        let hours = parseInt(hoursStr);
        if (periodPart === 'PM' && hours !== 12) hours += 12;
        if (periodPart === 'AM' && hours === 12) hours = 0;

        const slotDate = new Date(now);
        slotDate.setHours(hours, parseInt(minutesStr), 0, 0);

        return slotDate > now;
      };

      if (checkTime(time1)) slots.push(time1);
      if (checkTime(time2)) slots.push(time2);
    }
    return slots;
  };

  const timeSlots = getTimeSlotsForDate(selectedDate);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = [];
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    // Empty placeholders for start of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGuestDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBooking = async () => {
    setStatus(BookingStatus.CONFIRMING);

    try {
      // Format time to remove seconds if present (e.g. "14:00:00" -> "14:00")
      const formattedTime = selectedTime.split(':').slice(0, 2).join(':');

      // Prepare template parameters
      const templateParams = {
        to_name: "Happy Feet Admin",
        from_name: `${guestDetails.firstName} ${guestDetails.lastName}`,
        service_name: language === 'zh' ? selectedService.nameZh : selectedService.name,
        service_duration: `${selectedService.duration} minutes`,
        booking_date: selectedDate.split('-').slice(1).concat(selectedDate.split('-')[0]).join('-'), // YYYY-MM-DD -> MM-DD-YYYY
        booking_time: formattedTime,
        phone_number: guestDetails.phone,
        email_address: guestDetails.email,
        customer_note: `Client Note: ${guestDetails.comments || 'None'}\n\nSystem Log:\nNew booking request for ${selectedDate} at ${selectedTime}. Phone: ${guestDetails.phone}`
      };

      // Send Admin Email
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // Send Customer Confirmation Email
      // Using the same params is fine as the template handles the display
      await emailjs.send(SERVICE_ID, "template_syf1au2", templateParams, PUBLIC_KEY);

      // --- Google Calendar Integration ---
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyHjLrBtCRdKnr-SFVPly6Whq-1zDcNuVUeJAvx180QlqDE8QrbRMxStXtAaQoOcl2m7w/exec";

      try {
        // We use no-cors mode because Google Apps Script responses are opaque in standard fetch 
        // calls from the browser. This is a "fire and forget" request.
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_name: templateParams.service_name,
            customer_name: templateParams.from_name,
            customer_phone: templateParams.phone_number,
            customer_email: templateParams.email_address,
            customer_note: guestDetails.comments || "",
            date: selectedDate, // YYYY-MM-DD
            time: formattedTime, // HH:MM
            duration: selectedService.duration
          })
        });
        console.log("Calendar event request sent");
      } catch (calError) {
        console.error("Failed to add to calendar", calError);
        // We do typically NOT want to fail the whole booking if just the calendar sync fails, so we swallow this error
      }

      setStatus(BookingStatus.SUCCESS);
    } catch (error) {
      alert("Failed to send booking request. Please check console for details.");
      setStatus(BookingStatus.IDLE);
    }
  };

  const handleReset = () => {
    setStatus(BookingStatus.IDLE);
    setBookingStep(0);
    // Reset guest details, including comments field
    setGuestDetails({ firstName: '', lastName: '', email: '', phone: '', comments: '' });
    setSelectedTime('');
  };

  const isDetailsValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return guestDetails.firstName && guestDetails.lastName && guestDetails.email && emailRegex.test(guestDetails.email) && guestDetails.phone;
  };

  const formatDateDisplay = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { weekday: 'short', month: 'long', day: 'numeric' });
  };

  const displayMonth = currentMonth.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'default', { month: 'long', year: 'numeric' });

  // Reusable Service List Component
  const ServiceList = () => (
    <>
      {Object.entries(groupedServices).map(([category, services]) => (
        <div key={category} className="border-b border-stone-100 last:border-0">
          <div className="sticky top-0 bg-stone-50/95 backdrop-blur-md px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 border-b border-stone-100 z-10">
            {category}
          </div>
          <div className="p-2">
            {services.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedService(s);
                  setSelectedTime('');
                  setBookingStep(0);
                  setIsDropdownOpen(false);
                }}
                className={`
                            w-full text-left px-5 py-4 rounded-xl transition-all duration-200 group flex items-center justify-between gap-4 mb-1 last:mb-0
                            ${selectedService.id === s.id
                    ? 'bg-black text-white shadow-lg transform scale-[1.01]'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-black'
                  }
                        `}
              >
                <div className="flex flex-col gap-1">
                  <span className={`font-serif text-base md:text-lg leading-none ${selectedService.id === s.id ? 'text-white' : 'text-stone-800'}`}>{language === 'zh' ? s.nameZh : s.name}</span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${selectedService.id === s.id ? 'text-stone-400' : 'text-stone-400 group-hover:text-pink-500'}`}>{s.duration} {t.services.duration}</span>
                </div>
                <span className={`text-lg font-bold ${selectedService.id === s.id ? 'text-pink-300' : 'text-stone-900'}`}>${s.price}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </>
  );

  return (
    <section id="consultation" className="min-h-screen py-24 bg-stone-950 flex items-center justify-center p-6">
      {/* 
         Removed overflow-hidden from main container to allow desktop dropdowns to potentially pop out if needed,
         though visual clipping is handled by border-radius on children now.
      */}
      <div className={`max-w-6xl w-full bg-white rounded-[2rem] shadow-2xl min-h-[750px] animate-fade-in border border-white/5 transition-all duration-500 relative ${status === BookingStatus.SUCCESS ? 'flex flex-col' : 'flex flex-col lg:flex-row'}`}>

        {status === BookingStatus.SUCCESS ? (
          /* --- FULL SCREEN SUCCESS VIEW --- */
          <div className="w-full flex-1 flex flex-col items-center justify-center p-8 md:p-12 animate-fade-in relative overflow-hidden bg-stone-50/30 rounded-[2rem]">

            {/* Background Decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-50/50 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-stone-50/80 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">

              {/* Success Animation */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
                <div className="relative w-24 h-24 bg-green-50 rounded-full flex items-center justify-center border border-green-100 shadow-sm">
                  <CheckCircle className="text-green-500 w-12 h-12" strokeWidth={1.5} />
                </div>
              </div>

              <h3 className="text-3xl md:text-5xl font-serif mb-4 text-stone-900">{t.booking.success_title}</h3>
              <p className="text-stone-500 text-sm md:text-base mb-10 font-light max-w-sm leading-relaxed">
                {t.booking.success_msg} <span className="font-bold text-stone-800 border-b border-pink-200">{guestDetails.email}</span> {t.booking.shortly}
              </p>

              {/* Receipt / Ticket Card */}
              <div className="bg-white p-8 rounded-3xl w-full border border-stone-100 mb-10 shadow-xl shadow-stone-200/50 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-300 to-pink-100 opacity-80"></div>

                {/* Service Header */}
                <div className="flex justify-between items-start border-b border-stone-100 pb-6 mb-6">
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">{t.booking.receipt_service}</p>
                    <p className="font-serif text-2xl text-stone-900 leading-tight">{language === 'zh' ? selectedService.nameZh : selectedService.name}</p>
                  </div>
                  <div className="text-right pl-4">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2">{t.booking.receipt_duration}</p>
                    <p className="font-serif text-2xl text-stone-900 leading-tight">{selectedService.duration} {t.services.duration}</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-y-8 gap-x-4 text-left">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2 flex items-center gap-2"><Calendar size={12} /> {t.booking.receipt_date}</p>
                    <p className="text-base font-bold text-stone-800">{formatDateDisplay(selectedDate)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2 flex items-center gap-2"><Clock size={12} /> {t.booking.receipt_time}</p>
                    <p className="text-base font-bold text-stone-800">{selectedTime}</p>
                  </div>
                  <div className="col-span-2 pt-6 border-t border-stone-100">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-2 flex items-center gap-2"><User size={12} /> {t.booking.receipt_guest}</p>
                    <p className="text-lg font-bold text-stone-800">{guestDetails.firstName} {guestDetails.lastName}</p>
                    <p className="text-sm text-stone-500 mt-1">{guestDetails.phone}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-10 py-4 bg-black text-white rounded-2xl text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                {t.booking.book_another}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* --- LEFT PANE: Service Info --- */}
            <div className="w-full lg:w-[45%] bg-stone-50 p-10 border-r border-stone-100 flex flex-col justify-between relative z-20 rounded-t-[2rem] lg:rounded-tr-none lg:rounded-l-[2rem]">
              <div>
                <div className="h-16 mb-10">
                  <img src="/logo.png" alt="Logo" className="h-full w-auto" />
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg shrink-0 border-2 border-white">
                      <img src={selectedService.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="pt-1">
                      <h3 className="text-[10px] font-bold text-pink-500 uppercase tracking-widest mb-2">{t.booking.selected}</h3>
                      <p className="text-2xl font-serif text-black leading-none mb-2">{language === 'zh' ? selectedService.nameZh : selectedService.name}</p>
                      <p className="text-xl font-bold text-stone-900">${selectedService.price}+</p>
                    </div>
                  </div>

                  <p className="text-stone-500 text-sm font-light leading-relaxed border-l-2 border-pink-200 pl-4 py-1">
                    {(language === 'zh' ? selectedService.descriptionZh : selectedService.description) || "Relax and rejuvenate with our signature treatment."}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <div className="flex items-center gap-2 text-stone-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-stone-100">
                      <Clock size={14} className="text-pink-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">{selectedService.duration} {t.services.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-stone-100">
                      <MapPin size={14} className="text-pink-400" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Poughkeepsie</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-3 pl-1">{t.booking.change}</span>

                {/* Refined Dropdown Trigger */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`
                    w-full flex items-center justify-between bg-white border p-5 rounded-2xl transition-all shadow-sm group
                    ${isDropdownOpen ? 'border-black ring-1 ring-black/5' : 'border-stone-200 hover:border-pink-300'}
                  `}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-pink-500 transition-colors">{t.booking.current}</span>
                    <span className="text-lg font-serif text-stone-900 text-left line-clamp-1">
                      {language === 'zh' ? selectedService.nameZh : selectedService.name}
                    </span>
                  </div>
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${isDropdownOpen ? 'bg-black text-white rotate-180' : 'bg-stone-50 text-stone-400 group-hover:bg-pink-50 group-hover:text-pink-500'}
                  `}>
                    <ChevronUp size={18} />
                  </div>
                </button>

                {/* Dropdown Logic */}
                {isDropdownOpen && (
                  <>
                    {/* MOBILE: Fixed Bottom Sheet (Outside Card Flow) */}
                    {createPortal(
                      <>
                        <div
                          className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-fade-in touch-none"
                          onClick={() => setIsDropdownOpen(false)}
                        ></div>
                        <div className="lg:hidden fixed bottom-0 left-0 w-full z-[110] bg-white rounded-t-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] max-h-[85vh] flex flex-col animate-[fadeInUp_0.3s_ease-out] pb-safe">
                          {/* Drag Handle */}
                          <div className="w-full flex justify-center pt-3 pb-1" onClick={() => setIsDropdownOpen(false)}>
                            <div className="w-12 h-1.5 bg-stone-200 rounded-full"></div>
                          </div>

                          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 shrink-0">
                            <span className="font-serif text-2xl text-stone-900">{t.booking.change}</span>
                            <button
                              onClick={() => setIsDropdownOpen(false)}
                              className="w-8 h-8 flex items-center justify-center bg-stone-100 rounded-full text-stone-500 hover:bg-stone-200 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          <div className="overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            <ServiceList />
                          </div>
                        </div>
                      </>,
                      document.body
                    )}

                    {/* DESKTOP: Absolute Popover */}
                    <div className="hidden lg:block absolute bottom-full mb-4 left-0 w-full bg-white border border-stone-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] rounded-2xl max-h-[450px] overflow-y-auto z-50 animate-fade-in overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                      <ServiceList />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* --- RIGHT PANE: Cal.com Style Interface + Guest Details --- */}
            <div className="w-full lg:w-[55%] p-10 bg-white relative z-10 flex flex-col rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
              <div className="h-full flex flex-col">

                {/* Header: Date/Time or Guest Details Title */}
                <div className="flex items-center justify-between mb-8 h-10">
                  {bookingStep === 0 ? (
                    <>
                      <h2 className="text-lg font-bold text-black flex items-center gap-2">
                        {t.booking.idle_title}
                      </h2>
                      <div className="flex items-center gap-4">
                        <button
                          disabled={currentMonth.getFullYear() === new Date().getFullYear() && currentMonth.getMonth() === new Date().getMonth()}
                          onClick={handlePrevMonth}
                          className="p-2 hover:bg-stone-50 rounded-full transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm font-bold uppercase tracking-widest text-black">
                          {displayMonth}
                        </span>
                        <button onClick={handleNextMonth} className="p-2 hover:bg-stone-50 rounded-full transition-colors"><ChevronRight size={20} /></button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-4 w-full">
                      <button
                        onClick={() => setBookingStep(0)}
                        className="p-2 hover:bg-stone-50 rounded-full transition-colors -ml-2"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <h2 className="text-lg font-bold text-black">{t.booking.details_title}</h2>
                    </div>
                  )}
                </div>

                {/* Step 0: Calendar & Time Slots */}
                {bookingStep === 0 && (
                  <div className="animate-fade-in">
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-8">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-center text-[10px] font-bold text-stone-300 uppercase py-2">{d}</div>)}
                      {getDaysInMonth(currentMonth).map((day, idx) => {
                        if (!day) return <div key={`empty-${idx}`}></div>;
                        const dateStr = day.toISOString().split('T')[0];
                        const isSelected = selectedDate === dateStr;
                        const isToday = new Date().toISOString().split('T')[0] === dateStr;
                        const todayDate = new Date();
                        todayDate.setHours(0, 0, 0, 0);
                        const isPast = day < todayDate;

                        return (
                          <button
                            key={idx}
                            disabled={isPast}
                            onClick={() => { setSelectedDate(dateStr); setSelectedTime(''); }}
                            className={`
                                aspect-square rounded-xl text-sm font-bold transition-all flex items-center justify-center
                                ${isSelected ? 'bg-black text-white shadow-lg' : isPast ? 'text-stone-300 cursor-not-allowed opacity-50' : 'hover:bg-pink-50 text-stone-800'}
                                ${isToday && !isSelected ? 'text-pink-500 ring-1 ring-pink-100' : ''}
                              `}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time Slots */}
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-300 mb-4 border-b border-stone-50 pb-2">{t.booking.available}</h4>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 max-h-[160px] overflow-y-auto pr-1">
                        {timeSlots.length > 0 ? timeSlots.map(t => (
                          <button
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`
                                py-3 rounded-xl text-xs font-bold tracking-widest transition-all
                                ${selectedTime === t ? 'bg-pink-400 text-black' : 'bg-stone-50 text-stone-600 hover:bg-stone-100'}
                              `}
                          >
                            {t}
                          </button>
                        )) : (
                          <div className="col-span-full text-center text-stone-400 text-sm py-4 italic">{t.booking.no_slots}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Guest Details Form */}
                {bookingStep === 1 && (
                  <div className="flex flex-col gap-5 animate-fade-in mt-2">
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t.booking.fname}</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                          <input
                            type="text"
                            name="firstName"
                            value={guestDetails.firstName}
                            onChange={handleInputChange}
                            className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-11 pr-4 text-base font-bold text-stone-800 focus:outline-none focus:ring-1 focus:ring-black placeholder-stone-300 transition-all"
                            placeholder="Jane"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t.booking.lname}</label>
                        <input
                          type="text"
                          name="lastName"
                          value={guestDetails.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 px-4 text-base font-bold text-stone-800 focus:outline-none focus:ring-1 focus:ring-black placeholder-stone-300 transition-all"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t.booking.email}</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                        <input
                          type="email"
                          name="email"
                          value={guestDetails.email}
                          onChange={handleInputChange}
                          className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-11 pr-4 text-base font-bold text-stone-800 focus:outline-none focus:ring-1 focus:ring-black placeholder-stone-300 transition-all"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400">{t.booking.phone}</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                        <input
                          type="tel"
                          name="phone"
                          value={guestDetails.phone}
                          onChange={handleInputChange}
                          className="w-full bg-stone-50 border border-stone-100 rounded-xl py-3 pl-11 pr-4 text-base font-bold text-stone-800 focus:outline-none focus:ring-1 focus:ring-black placeholder-stone-300 transition-all"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 pl-1">{language === 'zh' ? '留言 (選填)' : 'Comments (Optional)'}</label>
                      <textarea
                        name="comments"
                        value={guestDetails.comments || ''}
                        onChange={handleInputChange}
                        placeholder={language === 'zh' ? '有什麼特別需要注意的嗎？' : 'Any special requests or injuries?'}
                        className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 text-base text-stone-900 placeholder-stone-300 focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none h-24 text-stone-900"
                      />
                    </div>
                  </div>
                )}

                {/* Footer Confirmation */}
                <div className="mt-auto pt-8 border-t border-stone-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{t.booking.review}</span>
                    <p className="text-black font-bold text-sm">
                      {selectedTime ? `${selectedDate.split('-').slice(1).concat(selectedDate.split('-')[0]).join('-')} at ${selectedTime}` : t.booking.pick_time}
                    </p>
                  </div>

                  {bookingStep === 0 ? (
                    <button
                      disabled={!selectedTime}
                      onClick={() => setBookingStep(1)}
                      className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] uppercase tracking-widest font-bold disabled:opacity-20 hover:bg-stone-800 hover:text-white transition-all flex items-center gap-3"
                    >
                      {t.booking.continue}
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      disabled={!isDetailsValid() || status === BookingStatus.CONFIRMING}
                      onClick={handleBooking}
                      className="px-8 py-4 bg-black text-white rounded-2xl text-[10px] uppercase tracking-widest font-bold disabled:opacity-20 hover:bg-pink-400 hover:text-black transition-all flex items-center gap-3"
                    >
                      {status === BookingStatus.CONFIRMING ? <Loader2 size={16} className="animate-spin" /> : t.booking.confirm}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section >
  );
};

export default BookingSection;