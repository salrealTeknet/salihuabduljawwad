import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight } from 'lucide-react';

const CustomSections: React.FC = () => {
  const { data } = usePortfolio();
  const { customContent } = data;

  if (!customContent || customContent.length === 0) return null;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {customContent.map((section, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <section key={section.id} className={`py-20 ${isEven ? 'bg-white dark:bg-slate-950' : 'bg-slate-50 dark:bg-slate-900'}`}>
            <div className="container mx-auto px-4 md:px-6">
              <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                
                {/* Text Content */}
                <div className={`w-full ${section.mediaType !== 'none' ? 'md:w-1/2' : 'max-w-4xl mx-auto text-center'}`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                    {section.title}
                  </h2>
                  <div className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed whitespace-pre-wrap mb-8">
                    {section.content}
                  </div>
                  
                  {section.readMoreUrl && (
                    <a 
                      href={section.readMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      Read More <ArrowRight size={18} />
                    </a>
                  )}
                </div>

                {/* Media Content */}
                {section.mediaType !== 'none' && section.mediaUrl && (
                  <div className="w-full md:w-1/2">
                    <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
                      {section.mediaType === 'image' ? (
                        <img 
                          src={section.mediaUrl} 
                          alt={section.title} 
                          className="w-full h-auto object-cover max-h-[500px]"
                        />
                      ) : (
                        <video 
                          src={section.mediaUrl} 
                          controls
                          className="w-full h-auto max-h-[500px]"
                        >
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default CustomSections;