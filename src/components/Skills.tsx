import React from 'react';
import { Database, FileSpreadsheet, LineChart, Cpu, Search, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

// Helper function to render the correct icon based on title or just return a default
const getIcon = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('excel')) return <FileSpreadsheet size={32} />;
  if (t.includes('bi')) return <LineChart size={32} />;
  if (t.includes('ai')) return <Cpu size={32} />;
  if (t.includes('clean')) return <Database size={32} />;
  if (t.includes('visual')) return <Layers size={32} />;
  return <Search size={32} />;
};

const Skills: React.FC = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <section id="skills" className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold text-sm mb-4">
            Technical Arsenal
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            My Analytical Toolkit
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            I combine industry-standard tools with cutting-edge AI to deliver comprehensive data solutions. Here are my core competencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow group">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-6 ${skill.color} bg-opacity-90 group-hover:scale-110 transition-transform duration-300`}>
                {getIcon(skill.title)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{skill.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                {skill.description}
              </p>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Proficiency</span>
                  <span className="font-bold text-slate-900 dark:text-white">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-2 rounded-full ${skill.color}`} 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
