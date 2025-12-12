import { useState, useEffect } from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // If we're on an article page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a1628]/80 backdrop-blur-xl border-b border-teal-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 border border-teal-400/60 rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 border border-teal-400/80 rounded-sm"></div>
            </div>
            <span className="text-white/90 tracking-wider">
              NUMEN INTELLIGENCE
            </span>
          </button>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("mission")}
              className="text-white/70 hover:text-teal-400 transition-colors"
            >
              {t('nav.mission')}
            </button>
            <button
              onClick={() => scrollToSection("value-chain")}
              className="text-white/70 hover:text-teal-400 transition-colors"
            >
              {t('nav.valueChain')}
            </button>
            <button
              onClick={() => scrollToSection("advantage")}
              className="text-white/70 hover:text-teal-400 transition-colors"
            >
              {t('nav.advantage')}
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className="text-white/70 hover:text-teal-400 transition-colors"
            >
              {t('nav.team')}
            </button>
            <button
              onClick={() => scrollToSection("analysis")}
              className="text-white/70 hover:text-teal-400 transition-colors"
            >
              {t('nav.analysis')}
            </button>
            <button
              onClick={() => scrollToSection("investment")}
              className="text-white/70 hover:text-teal-400 transition-colors"
            >
              {t('nav.investment')}
            </button>
            <button
              onClick={() => scrollToSection("vision")}
              className="text-white/70 hover:text-teal-400 transition-colors"
            >
              {t('nav.vision')}
            </button>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 border border-teal-400/30 text-teal-400 hover:bg-teal-400/10 transition-all rounded group"
              title="Toggle Language"
            >
              <Languages className="w-4 h-4" />
              <span className="uppercase">{language}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}