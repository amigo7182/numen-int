import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function MissionSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="mission"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block px-4 py-1 mb-4 border border-teal-400/40 rounded-full">
            <span className="text-teal-400 text-sm tracking-widest">{t('mission.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white">{t('mission.title')}</h2>
        </div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left panel */}
          <div 
            className={`bg-[#0d2847]/30 backdrop-blur-md border border-teal-400/20 rounded-lg p-8 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <h3 className="text-xl text-teal-400">{t('mission.mission.title')}</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              {t('mission.mission.content')}
            </p>
          </div>

          {/* Right panel */}
          <div 
            className={`bg-[#0d2847]/30 backdrop-blur-md border border-teal-400/20 rounded-lg p-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="mb-4 flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
              <h3 className="text-xl text-teal-400">{t('mission.vision.title')}</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              {t('mission.vision.content')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
