import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [preSelectedServiceId, setPreSelectedServiceId] = React.useState<string | null>(null);

  const handleServiceSelect = (id: string) => {
    setPreSelectedServiceId(id);
    // Smooth scroll to booking section
    const element = document.getElementById('consultation');
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-pink-100 selection:text-black overflow-x-hidden w-full">
        <Navbar />
        <Hero />
        <About />
        <Services onServiceSelect={handleServiceSelect} />
        <BookingSection initialServiceId={preSelectedServiceId} />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;