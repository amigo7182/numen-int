import { useEffect, useRef, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimationEngine } from './components/AnimationEngine';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MissionSection } from './components/MissionSection';
import { ValueChainSection } from './components/ValueChainSection';
import { CompetitiveAdvantageSection } from './components/CompetitiveAdvantageSection';
import { TeamSection } from './components/TeamSection';
import { CentralAsianAnalysisSection } from './components/CentralAsianAnalysisSection';
import { InvestmentSection } from './components/InvestmentSection';
import { VisionSection } from './components/VisionSection';
import { ConclusionSection } from './components/ConclusionSection';
import { ArticlePage } from './components/ArticlePage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import { ArticlesProvider } from './contexts/ArticlesContext';

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AnimationEngine | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize animation engine
    engineRef.current = new AnimationEngine(canvas, ctx);
    engineRef.current.start();

    // Handle scroll for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      engineRef.current?.stop();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />
    </div>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <ValueChainSection />
      <CompetitiveAdvantageSection />
      <TeamSection />
      <CentralAsianAnalysisSection />
      <InvestmentSection />
      <VisionSection />
      <ConclusionSection />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ArticlesProvider>
        <Router>
          <div className="relative min-h-screen">
            {/* Fixed animated background */}
            <AnimatedBackground />

            {/* Foreground content */}
            <div className="relative z-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:id" element={<ArticlePage />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ArticlesProvider>
    </LanguageProvider>
  );
}
