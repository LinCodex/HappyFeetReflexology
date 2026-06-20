import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import GrandOpeningBanner from './components/GrandOpeningBanner';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-pink-100 selection:text-black overflow-x-hidden w-full">
        <GrandOpeningBanner />
        <Navbar />
        <Hero />
        <About />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;