import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiDefaultTheme } from './themes/muiDefault';
import { baseTheme } from './themes/base';
import { glassTheme } from './themes/glass';
import { corporateTheme } from './themes/corporate';
import { solarizedTheme } from './themes/solarized';
import { terracottaTheme } from './themes/terracotta';
import { terracottaDarkTheme } from './themes/terracottaDark';
import { neuromancerTheme } from './themes/neuromancer';
import { cardboardTheme } from './themes/cardboard';
import { ThemeEditorProvider, useThemeEditor } from './ThemeEditorContext';

export type ThemeName =
  | 'mui-default'
  | 'base'
  | 'glass'
  | 'corporate'
  | 'solarized'
  | 'terracotta'
  | 'terracotta-dark'
  | 'neuromancer'
  | 'cardboard';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (name: ThemeName) => void;
  baseTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'solarized',
  setTheme: () => {},
  baseTheme: solarizedTheme,
});

export const useThemeSwitcher = () => useContext(ThemeContext);

const getThemeByName = (name: ThemeName): Theme => {
  switch (name) {
    case 'mui-default': return muiDefaultTheme;
    case 'glass': return glassTheme;
    case 'corporate': return corporateTheme;
    case 'solarized': return solarizedTheme;
    case 'terracotta': return terracottaTheme;
    case 'terracotta-dark': return terracottaDarkTheme;
    case 'neuromancer': return neuromancerTheme;
    case 'cardboard': return cardboardTheme;
    case 'base': default: return baseTheme;
  }
};

// Inner component that uses the theme editor context
const ThemeApplier: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { customTheme } = useThemeEditor();

  return (
    <MuiThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeName>('solarized');

  const baseTheme = useMemo(() => getThemeByName(themeName), [themeName]);

  return (
    <ThemeContext.Provider value={{ currentTheme: themeName, setTheme: setThemeName, baseTheme }}>
      <ThemeEditorProvider baseTheme={baseTheme}>
        <ThemeApplier>
          {children}
        </ThemeApplier>
      </ThemeEditorProvider>
    </ThemeContext.Provider>
  );
};
