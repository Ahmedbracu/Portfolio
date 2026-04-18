import { useState } from 'react';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { useLenis } from '@/hooks/useLenis';
import { SidePanel } from '@/components/SidePanel';
import { AdminButton } from '@/components/AdminButton';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Skills } from '@/sections/Skills';
import { Experience } from '@/sections/Experience';
import { Projects } from '@/sections/Projects';
import { Contact } from '@/sections/Contact';
import { CyberpunkBg } from '@/components/CyberpunkBg';
import { Loader } from '@/components/Loader';

function AppContent() {
  useLenis();

  return (
    <div className="relative min-h-screen bg-dark">
      <CyberpunkBg />
      <div className="scanlines"></div>
      
      <SidePanel />

      <main className="relative z-10 lg:ml-[280px]">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <AdminButton />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

export default App;
