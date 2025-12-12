import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ConclusionSection() {
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
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Main conclusion */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block px-4 py-1 mb-8 border border-teal-400/40 rounded-full">
            <span className="text-teal-400 text-sm tracking-widest">{t('conclusion.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl text-white mb-8 leading-tight">
            {t('conclusion.title')}
          </h2>

          <div 
            className={`bg-[#0d2847]/30 backdrop-blur-xl border border-teal-400/30 rounded-lg p-10 mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-white/80 text-xl leading-relaxed mb-6">
              {t('conclusion.description')}
            </p>
            
            <p className="text-white/70 text-lg leading-relaxed">
              {t('conclusion.solution.description')}
            </p>
          </div>

          {/* Call to action */}
          <div 
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button className="group px-8 py-4 bg-teal-400/10 hover:bg-teal-400/20 border-2 border-teal-400 text-teal-400 rounded-lg transition-all duration-300 inline-flex items-center space-x-3">
              <span className="text-lg">{t('conclusion.call.contact')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Key takeaways */}
        <div 
          className={`grid md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-[#0d2847]/20 backdrop-blur-md border border-teal-400/20 rounded-lg p-6 text-center">
            <div className="text-3xl text-teal-400 mb-2">89%</div>
            <div className="text-white/70 text-sm">Predictive Accuracy</div>
          </div>
          
          <div className="bg-[#0d2847]/20 backdrop-blur-md border border-teal-400/20 rounded-lg p-6 text-center">
            <div className="text-3xl text-teal-400 mb-2">120+</div>
            <div className="text-white/70 text-sm">Analysis Parameters</div>
          </div>
          
          <div className="bg-[#0d2847]/20 backdrop-blur-md border border-teal-400/20 rounded-lg p-6 text-center">
            <div className="text-3xl text-teal-400 mb-2">$1M</div>
            <div className="text-white/70 text-sm">First-Year Investment</div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className={`pt-16 border-t border-teal-400/20 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 border border-teal-400/60 rounded-sm flex items-center justify-center">
                <div className="w-4 h-4 border border-teal-400/80 rounded-sm"></div>
              </div>
              <div>
                <div className="text-white/90 tracking-wider">CENTRAL ASIA ANALYTICS</div>
                <div className="text-white/50 text-sm">Intelligence for Regional Stability</div>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center space-x-8">
              <a href="#" className="text-white/60 hover:text-teal-400 transition-colors text-sm">
                Contact
              </a>
              <a href="#" className="text-white/60 hover:text-teal-400 transition-colors text-sm">
                Research
              </a>
              <a href="#" className="text-white/60 hover:text-teal-400 transition-colors text-sm">
                Partnership
              </a>
            </div>
          </div>

          <div className="mt-8 text-center text-white/40 text-sm">
            © 2025 Central Asia Analytical Think Tank. Advanced intelligence for informed decisions.
          </div>
        </div>
      </div>
    </section>
  );
}
