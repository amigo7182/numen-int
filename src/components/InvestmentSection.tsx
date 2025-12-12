import { useEffect, useRef, useState } from 'react';
import { DollarSign, Users, Building2, Laptop, TrendingUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function InvestmentSection() {
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

  const budgetItems = [
    {
      icon: Users,
      category: "Human Capital",
      amount: "$450,000",
      percentage: "45%",
      description: "Senior researchers, AI specialists, regional analysts, and support staff salaries",
      breakdown: [
        "5 senior researchers",
        "3 AI/data scientists",
        "6 regional analysts",
        "Administrative team"
      ]
    },
    {
      icon: Laptop,
      category: "Technology Infrastructure",
      amount: "$250,000",
      percentage: "25%",
      description: "AI system development, data processing infrastructure, and secure communication platforms",
      breakdown: [
        "AI model training & deployment",
        "Data acquisition & storage",
        "Cybersecurity systems",
        "Software licenses"
      ]
    },
    {
      icon: Building2,
      category: "Operations & Facilities",
      amount: "$150,000",
      percentage: "15%",
      description: "Office space in Central Asia, operational expenses, and administrative overhead",
      breakdown: [
        "Office facilities",
        "Utilities & maintenance",
        "Legal & compliance",
        "Insurance coverage"
      ]
    },
    {
      icon: TrendingUp,
      category: "Research & Fieldwork",
      amount: "$100,000",
      percentage: "10%",
      description: "Field research trips, data collection, conference participation, and publication costs",
      breakdown: [
        "Regional field missions",
        "Data collection expenses",
        "Conference attendance",
        "Publishing & dissemination"
      ]
    },
    {
      icon: DollarSign,
      category: "Partnerships & Engagement",
      amount: "$50,000",
      percentage: "5%",
      description: "Academic collaborations, stakeholder engagement events, and strategic partnerships",
      breakdown: [
        "Harvard/MIT partnerships",
        "Stakeholder workshops",
        "Advisory board meetings",
        "Strategic consultations"
      ]
    }
  ];

  const totalBudget = "$1,000,000";

  return (
    <section 
      id="investment"
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
            <span className="text-teal-400 text-sm tracking-widest">{t('investment.badge')}</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">{t('investment.title')}</h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px w-16 bg-teal-400/40"></div>
            <p className="text-5xl text-teal-400">{totalBudget}</p>
            <div className="h-px w-16 bg-teal-400/40"></div>
          </div>
          <p className="text-white/60 max-w-2xl mx-auto">
            {t('investment.description')}
          </p>
        </div>

        {/* Budget items */}
        <div className="space-y-4">
          {budgetItems.map((item, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              {/* Card */}
              <div className="bg-[#0d2847]/20 backdrop-blur-xl border border-teal-400/20 hover:border-teal-400/40 rounded-lg p-6 transition-all duration-300">
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  {/* Icon and category */}
                  <div className="md:col-span-3 flex items-center space-x-4">
                    <div className="p-3 border border-teal-400/30 rounded-lg bg-teal-400/5">
                      <item.icon className="w-6 h-6 text-teal-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-white text-lg">{item.category}</h3>
                      <p className="text-teal-400 text-sm">{item.percentage}</p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="md:col-span-2 flex items-center">
                    <div className="text-3xl text-teal-400">{item.amount}</div>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-4">
                    <p className="text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Breakdown */}
                  <div className="md:col-span-3">
                    <div className="space-y-1">
                      {item.breakdown.map((line, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-teal-400/60 rounded-full"></div>
                          <span className="text-white/50 text-sm">{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4 h-1 bg-teal-400/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-teal-400/40 rounded-full transition-all duration-1000"
                    style={{ 
                      width: isVisible ? item.percentage : '0%',
                      transitionDelay: `${400 + index * 100}ms`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline note */}
        <div 
          className={`mt-12 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-[#0d2847]/40 backdrop-blur-md border border-teal-400/30 rounded-lg px-8 py-4">
            <p className="text-white/80">
              <span className="text-teal-400">12-Month Implementation:</span> Full operational capacity 
              achieved within one year, with quarterly milestone reviews and performance assessments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
