import React from 'react';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const About: React.FC = () => {
  const { data } = usePortfolio();
  const { about, settings } = data;

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-5/12">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl translate-x-4 translate-y-4"></div>
              <img 
                src={settings.profileImage} 
                alt="Profile" 
                className="relative z-10 w-full h-auto rounded-2xl object-cover shadow-xl border-4 border-white dark:border-slate-900 aspect-[4/5]"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl z-20 flex items-center gap-4 border border-slate-100 dark:border-slate-700">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
                  <Award className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Experience</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{about.experience}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-7/12">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold text-sm mb-4">
              About Me
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              Turning Complex Data Into <span className="text-blue-600 dark:text-blue-400">Clear Decisions</span>
            </h2>
            
            <div className="space-y-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
              <p>{about.description1}</p>
              <p>{about.description2}</p>
              <p>{about.description3}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Education</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{about.education}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-blue-600 dark:text-blue-400">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Experience</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{about.experienceText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
