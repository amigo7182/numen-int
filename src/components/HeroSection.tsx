import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div 
        className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Badge */}
        <div className="inline-block px-4 py-2 border border-teal-400/30 rounded-full mb-8">
          <span className="text-teal-400 tracking-wider">{t('hero.badge')}</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-tight leading-tight">
          {t('hero.title')}
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <p className="text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
          {t('hero.description')}
        </p>

        {/* CTA Button */}
        <button className="group relative px-8 py-4 bg-transparent border-2 border-teal-400/60 text-teal-400 hover:border-teal-400 transition-all duration-300 rounded">
          <span className="relative z-10">{t('hero.cta')}</span>
          <div className="absolute inset-0 bg-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
        </button>

        {/* Decorative elements */}
        <div className="mt-20 flex justify-center items-center space-x-12">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-teal-400/40"></div>
          <div className="text-white/40 text-sm tracking-widest">{t('hero.scroll').toUpperCase()}</div>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-teal-400/40"></div>
        </div>
      </div>
    </section>
  );
}