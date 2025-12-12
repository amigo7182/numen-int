import { useEffect, useRef, useState } from 'react';
import { Award, Cpu, Users, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function CompetitiveAdvantageSection() {
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

  const partnerships = (t('advantage.partnerships.institutions') as unknown as Array<{name: string, role: string}>);
  
  const advantages = [
    {
      icon: Award,
      title: partnerships[0]?.name || "Harvard University",
      description: partnerships[0]?.role || "",
      metrics: ["Academic Excellence", "Research Standards", "Global Recognition"]
    },
    {
      icon: Cpu,
      title: partnerships[1]?.name || "MIT",
      description: partnerships[1]?.role || "",
      metrics: ["Advanced Technology", "89% Accuracy", "120+ Parameters"]
    },
    {
      icon: Users,
      title: partnerships[3]?.name || "Regional Universities",
      description: partnerships[3]?.role || "",
      metrics: ["Regional Expertise", "Local Networks", "Cultural Intelligence"]
    },
    {
      icon: Globe,
      title: partnerships[2]?.name || "Nobel Laureates",
      description: partnerships[2]?.role || "",
      metrics: ["Policy Experience", "Government Networks", "Strategic Insight"]
    }
  ];

  return (
    <section 
      id="advantage"
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block px-4 py-1 mb-4 border border-teal-400/40 rounded-full">
            <span className="text-teal-400 text-sm tracking-widest">{t('advantage.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">{t('advantage.partnerships.title')}</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('advantage.partnerships.description')}
          </p>
        </div>

        {/* Advantages grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Glass card */}
              <div className="h-full bg-[#0d2847]/20 backdrop-blur-xl border border-teal-400/20 hover:border-teal-400/40 rounded-lg p-8 transition-all duration-300">
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 border border-teal-400/30 rounded-lg bg-teal-400/5">
                  <advantage.icon className="w-8 h-8 text-teal-400" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-2xl text-white mb-4">{advantage.title}</h3>

                {/* Description */}
                <p className="text-white/60 leading-relaxed mb-6">
                  {advantage.description}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2">
                  {advantage.metrics.map((metric, idx) => (
                    <div 
                      key={idx}
                      className="px-3 py-1 bg-teal-400/10 border border-teal-400/30 rounded-full"
                    >
                      <span className="text-teal-400 text-sm">{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Decorative line */}
                <div className="mt-6 h-px bg-gradient-to-r from-teal-400/0 via-teal-400/30 to-teal-400/0"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom emphasis */}
        <div 
          className={`mt-12 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-[#0d2847]/40 backdrop-blur-md border border-teal-400/30 rounded-lg px-8 py-4">
            <p className="text-white/80">
              <span className="text-teal-400">{t('advantage.description')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
