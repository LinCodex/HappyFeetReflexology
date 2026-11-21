import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F7F4EE] text-[#1F1B16] antialiased overflow-x-clip">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
