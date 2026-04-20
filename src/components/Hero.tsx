import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { usePortfolio } from '../context/PortfolioContext';

const Hero: React.FC = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.jpg" 
          alt="Data Analytics Background" 
          className="w-full h-full object-cover opacity-10 dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-100/90 dark:from-slate-900 dark:via-slate-900/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-transparent dark:from-slate-900 dark:via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium text-sm mb-6 border border-blue-200 dark:border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">{hero.name}</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 mb-6">
            {hero.title}
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/dashboard-demo"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1"
            >
              View Dashboard
              <ArrowRight size={20} />
            </Link>
            
            <ScrollLink 
              to="contact"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-8 py-4 rounded-full font-semibold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm"
            >
              Contact Me
            </ScrollLink>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-blue-400/20 dark:bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-300/20 dark:bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
    </section>
  );
};

export default Hero;
