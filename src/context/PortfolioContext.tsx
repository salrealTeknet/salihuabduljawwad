import React, { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';
import { defaultData } from '../data/initialData';

// Configure localforage to handle larger files like videos
localforage.config({
  name: 'PortfolioDB',
  storeName: 'portfolio_store'
});

type PortfolioContextType = {
  data: typeof defaultData;
  updateSection: (section: keyof typeof defaultData, payload: any) => void;
  resetToDefault: () => void;
  isLoading: boolean;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<typeof defaultData>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = await localforage.getItem('portfolio_data');
        if (saved) {
          setData({ ...defaultData, ...(saved as any) });
        }
      } catch (e) {
        console.error("Error loading data from localforage", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const updateSection = async (section: keyof typeof defaultData, payload: any) => {
    setData(prev => {
      const newData = { ...prev, [section]: payload };
      localforage.setItem('portfolio_data', newData).catch(e => console.error("Save error", e));
      return newData;
    });
  };

  const resetToDefault = async () => {
    setData(defaultData);
    await localforage.removeItem('portfolio_data');
  };

  return (
    <PortfolioContext.Provider value={{ data, updateSection, resetToDefault, isLoading }}>
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