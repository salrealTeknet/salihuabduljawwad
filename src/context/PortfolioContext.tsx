import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultData } from '../data/initialData';

type PortfolioContextType = {
  data: typeof defaultData;
  updateSection: (section: keyof typeof defaultData, payload: any) => void;
  resetToDefault: () => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<typeof defaultData>(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      try {
        return { ...defaultData, ...JSON.parse(saved) }; // Merge to ensure new fields exist
      } catch (e) {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
  }, [data]);

  const updateSection = (section: keyof typeof defaultData, payload: any) => {
    setData(prev => ({
      ...prev,
      [section]: payload
    }));
  };

  const resetToDefault = () => {
    setData(defaultData);
    localStorage.removeItem('portfolio_data');
  };

  return (
    <PortfolioContext.Provider value={{ data, updateSection, resetToDefault }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};