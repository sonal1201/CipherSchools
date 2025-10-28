import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { saveSettings, getSettings } from '../utils/storage';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  autoSave: boolean;
  toggleAutoSave: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    const settings = getSettings();
    setTheme(settings.theme);
    setAutoSave(settings.autoSave);
    
    // Apply theme to document
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    saveSettings({ theme: newTheme, autoSave, autoSaveInterval: 3000 });
  };

  const toggleAutoSave = () => {
    const newAutoSave = !autoSave;
    setAutoSave(newAutoSave);
    saveSettings({ theme, autoSave: newAutoSave, autoSaveInterval: 3000 });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, autoSave, toggleAutoSave }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

