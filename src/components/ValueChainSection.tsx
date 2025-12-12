import { useEffect, useRef, useState } from 'react';
import { Brain, Network, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function ValueChainSection() {
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

  const collectionItems = (t('valueChain.collection.items') as unknown as string[]);
  const processingItems = (t('valueChain.processing.items') as unknown as string[]);
  const deliveryItems = (t('valueChain.delivery.items') as unknown as string[]);

  const valueChainItems = [
    {
      icon: FileText,
      number: "01",
      title: t('valueChain.collection.title'),
      subtitle: t('valueChain.collection.subtitle'),
      description: t('valueChain.description'),
      items: collectionItems
    },
    {
      icon: Brain,
      number: "02",
      title: t('valueChain.processing.title'),
      subtitle: t('valueChain.processing.subtitle'),
      description: t('valueChain.description'),
      items: processingItems,
      highlight: true
    },
    {
      icon: Network,
      number: "03",
      title: t('valueChain.delivery.title'),
      subtitle: t('valueChain.delivery.subtitle'),
      description: t('valueChain.description'),
      items: deliveryItems
    }
  ];

  return (
    <section 
      id="value-chain"
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
            <span className="text-teal-400 text-sm tracking-widest">{t('valueChain.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">{t('valueChain.title')}</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('valueChain.description')}
          </p>
        </div>

        {/* Value chain cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {valueChainItems.map((item, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Card */}
              <div 
                className={`h-full bg-[#0d2847]/30 backdrop-blur-md border rounded-lg p-8 transition-all duration-300 ${
                  item.highlight 
                    ? 'border-teal-400/60 bg-teal-400/5' 
                    : 'border-teal-400/20 hover:border-teal-400/40'
                }`}
              >
                {/* Number badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="text-teal-400/40 text-sm tracking-widest">{item.number}</div>
                  <div className="w-12 h-12 border border-teal-400/40 rounded flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl text-white mb-2">{item.title}</h3>
                {item.subtitle && (
                  <p className="text-teal-400/80 text-sm mb-4">{item.subtitle}</p>
                )}

                {/* Items */}
                <div className="space-y-2">
                  {item.items.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-teal-400/60 rounded-full"></div>
                      <span className="text-white/50 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Highlight indicator */}
                {item.highlight && (
                  <div className="mt-6 pt-6 border-t border-teal-400/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                      <span className="text-teal-400 text-sm">{t('valueChain.processing.title')}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
