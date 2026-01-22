import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiDefaultTheme } from './themes/muiDefault';
import { baseTheme } from './themes/base';
import { glassTheme } from './themes/glass';
import { corporateTheme } from './themes/corporate';
import { solarizedTheme } from './themes/solarized';
import { terracottaTheme } from './themes/terracotta';
import { terracottaDarkTheme } from './themes/terracottaDark';

export type ThemeName =
  | 'mui-default'
  | 'base'
  | 'glass'
  | 'corporate'
  | 'solarized'
  | 'terracotta'
  | 'terracotta-dark';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType>({ currentTheme: 'base', setTheme: () => {} });

export const useThemeSwitcher = () => useContext(ThemeContext);

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('base');

  const theme = useMemo(() => {
    switch (themeName) {
      case 'mui-default': return muiDefaultTheme;
      case 'glass': return glassTheme;
      case 'corporate': return corporateTheme;
      case 'solarized': return solarizedTheme;
      case 'terracotta': return terracottaTheme;
      case 'terracotta-dark': return terracottaDarkTheme;
      case 'base': default: return baseTheme;
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ currentTheme: themeName, setTheme: setThemeName }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
