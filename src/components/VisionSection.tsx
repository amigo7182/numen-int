import { useEffect, useRef, useState } from 'react';
import { Target, TrendingUp, Globe2, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function VisionSection() {
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

  const milestones = (t('vision.milestones') as unknown as Array<{
    year: string;
    title: string;
    items: string[];
  }>);

  const visionGoals = milestones.map((milestone, index) => {
    const icons = [Target, TrendingUp, Globe2, Shield];
    return {
      icon: icons[index] || Target,
      year: milestone.year,
      title: milestone.title,
      description: milestone.items.join(' '),
      metrics: milestone.items.slice(0, 3)
    };
  });

  return (
    <section 
      id="vision"
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
            <span className="text-teal-400 text-sm tracking-widest">{t('vision.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-white mb-4">
            {t('vision.title')}
          </h2>
          <p className="text-white/60 text-xl max-w-3xl mx-auto">
            {t('vision.description')}
          </p>
        </div>

        {/* Vision goals grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {visionGoals.map((goal, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Card with gradient border effect */}
              <div className="relative h-full">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-teal-400/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 rounded-lg"></div>
                
                {/* Main card */}
                <div className="relative h-full bg-[#0d2847]/30 backdrop-blur-xl border border-teal-400/20 hover:border-teal-400/50 rounded-lg p-8 transition-all duration-300">
                  {/* Year badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-teal-400/10 border border-teal-400/40 rounded-full">
                    <span className="text-teal-400 text-sm tracking-wider">{goal.year}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 inline-flex p-4 border border-teal-400/30 rounded-lg bg-teal-400/5 group-hover:bg-teal-400/10 transition-colors">
                    <goal.icon className="w-8 h-8 text-teal-400" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl text-white mb-4">{goal.title}</h3>

                  {/* Description */}
                  <p className="text-white/70 leading-relaxed mb-6">
                    {goal.description}
                  </p>

                  {/* Metrics */}
                  <div className="space-y-2 pt-4 border-t border-teal-400/20">
                    {goal.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <div className="w-2 h-2 border border-teal-400 rounded-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-teal-400 rounded-full"></div>
                        </div>
                        <span className="text-white/60 text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key milestones */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-[#0d2847]/20 backdrop-blur-xl border border-teal-400/30 rounded-lg p-8">
            <h3 className="text-2xl text-white mb-6 text-center">{t('vision.longTerm.title')}</h3>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl text-teal-400 mb-2">Year 1</div>
                <div className="text-white/60 text-sm">Foundation & Launch</div>
                <div className="mt-2 h-1 bg-teal-400/30 rounded-full"></div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-teal-400 mb-2">Year 2</div>
                <div className="text-white/60 text-sm">Network Building</div>
                <div className="mt-2 h-1 bg-teal-400/30 rounded-full"></div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-teal-400 mb-2">Year 3</div>
                <div className="text-white/60 text-sm">Scale & Expansion</div>
                <div className="mt-2 h-1 bg-teal-400/30 rounded-full"></div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl text-teal-400 mb-2">Year 4</div>
                <div className="text-white/60 text-sm">Regional Leadership</div>
                <div className="mt-2 h-1 bg-teal-400/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
