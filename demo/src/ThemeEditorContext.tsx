/**
 * ThemeEditorContext - Provides live theme customization state
 * Allows real-time manipulation of theme values with instant preview
 *
 * FULL THEME STRUCTURE:
 * - Palette colors with light/main/dark/contrastText
 * - Background with default/paper and augmented bk1-bk4
 * - ColorGuide object (full colorGuide map)
 * - ext catch-all for custom properties
 */
import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { createTheme, Theme } from '@mui/material/styles';
// ColorGuide type is Record<string, string> - matches the colorGuide.ts export

// Full palette color structure
export interface PaletteColorOverride {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

// Extended background with bk1-bk4
export interface BackgroundOverride {
  default: string;
  paper: string;
  bk1?: string;
  bk2?: string;
  bk3?: string;
  bk4?: string;
}

// Text colors
export interface TextOverride {
  primary: string;
  secondary: string;
  disabled?: string;
}

// Full theme overrides interface
export interface ThemeOverrides {
  // Palette colors with full light/main/dark structure
  primary: PaletteColorOverride;
  secondary: PaletteColorOverride;
  success: PaletteColorOverride;
  warning: PaletteColorOverride;
  error: PaletteColorOverride;
  info: PaletteColorOverride;
  // Background with augmented properties
  background: BackgroundOverride;
  // Text
  text: TextOverride;
  // ColorGuide - the full color map
  colorGuide: Record<string, string>;
  // ext - catch-all for custom properties
  ext: Record<string, any>;
  // Shape
  borderRadius: number;
  // Spacing
  spacingUnit: number;
  // Typography
  fontSize: number;
  fontWeightRegular: number;
}

// Helper to extract palette color from theme
const extractPaletteColor = (paletteColor: any): PaletteColorOverride => ({
  light: paletteColor?.light || '#ffffff',
  main: paletteColor?.main || '#1976d2',
  dark: paletteColor?.dark || '#000000',
  contrastText: paletteColor?.contrastText || '#ffffff',
});

// Helper to extract background from theme
const extractBackground = (bg: any): BackgroundOverride => ({
  default: bg?.default || '#ffffff',
  paper: bg?.paper || '#f5f5f5',
  bk1: bg?.bk1,
  bk2: bg?.bk2,
  bk3: bg?.bk3,
  bk4: bg?.bk4,
});

// Helper to extract text from theme
const extractText = (text: any): TextOverride => ({
  primary: text?.primary || '#000000',
  secondary: text?.secondary || '#666666',
  disabled: text?.disabled,
});

// Helper to extract overrides from a theme
export const extractOverridesFromTheme = (theme: Theme): ThemeOverrides => ({
  primary: extractPaletteColor(theme.palette.primary),
  secondary: extractPaletteColor(theme.palette.secondary),
  success: extractPaletteColor(theme.palette.success),
  warning: extractPaletteColor(theme.palette.warning),
  error: extractPaletteColor(theme.palette.error),
  info: extractPaletteColor(theme.palette.info),
  background: extractBackground(theme.palette.background),
  text: extractText(theme.palette.text),
  colorGuide: (theme.palette as any).colorGuide || {},
  ext: (theme.palette as any).ext || {},
  borderRadius: (theme.shape?.borderRadius as number) || 4,
  spacingUnit: 8,
  fontSize: (theme.typography?.fontSize as number) || 14,
  fontWeightRegular: (theme.typography?.fontWeightRegular as number) || 400,
});

interface ThemeEditorContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  overrides: ThemeOverrides;
  updateOverrides: (partial: Partial<ThemeOverrides>) => void;
  resetOverrides: () => void;
  exportTheme: () => string;
  customTheme: Theme;
}

const ThemeEditorContext = createContext<ThemeEditorContextType | null>(null);

export const useThemeEditor = () => {
  const context = useContext(ThemeEditorContext);
  if (!context) {
    throw new Error('useThemeEditor must be used within ThemeEditorProvider');
  }
  return context;
};

interface ThemeEditorProviderProps {
  children: React.ReactNode;
  baseTheme: Theme;
}

export const ThemeEditorProvider: React.FC<ThemeEditorProviderProps> = ({ children, baseTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [overrides, setOverrides] = useState<ThemeOverrides>(() => extractOverridesFromTheme(baseTheme));

  // Deep merge helper for nested objects
  const deepMerge = useCallback((target: any, source: any): any => {
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }, []);

  const updateOverrides = useCallback((partial: Partial<ThemeOverrides>) => {
    setOverrides((prev) => deepMerge(prev, partial));
  }, [deepMerge]);

  const resetOverrides = useCallback(() => {
    setOverrides(extractOverridesFromTheme(baseTheme));
  }, [baseTheme]);

  // Sync overrides when base theme changes
  useEffect(() => {
    resetOverrides();
  }, [baseTheme, resetOverrides]);

  const customTheme = useMemo(() => {
    // Create a new theme with full palette structure
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        primary: { ...overrides.primary },
        secondary: { ...overrides.secondary },
        success: { ...overrides.success },
        warning: { ...overrides.warning },
        error: { ...overrides.error },
        info: { ...overrides.info },
        background: { ...overrides.background },
        text: { ...overrides.text },
        colorGuide: overrides.colorGuide,
        ext: overrides.ext,
      } as any,
      shape: { borderRadius: overrides.borderRadius },
      spacing: overrides.spacingUnit,
      typography: {
        ...baseTheme.typography,
        fontSize: overrides.fontSize,
        fontWeightRegular: overrides.fontWeightRegular,
      },
    });
  }, [baseTheme, overrides]);

  const exportTheme = useCallback(() => {
    return `// Generated Theme Configuration
// Full theme overrides including light/main/dark variants
const themeOverrides = ${JSON.stringify(overrides, null, 2)};

export const customTheme = createTheme({
  palette: {
    primary: ${JSON.stringify(overrides.primary, null, 4)},
    secondary: ${JSON.stringify(overrides.secondary, null, 4)},
    success: ${JSON.stringify(overrides.success, null, 4)},
    warning: ${JSON.stringify(overrides.warning, null, 4)},
    error: ${JSON.stringify(overrides.error, null, 4)},
    info: ${JSON.stringify(overrides.info, null, 4)},
    background: ${JSON.stringify(overrides.background, null, 4)},
    text: ${JSON.stringify(overrides.text, null, 4)},
    colorGuide: { /* ${Object.keys(overrides.colorGuide).length} colors */ },
    ext: ${JSON.stringify(overrides.ext, null, 4)},
  },
  shape: { borderRadius: ${overrides.borderRadius} },
  spacing: ${overrides.spacingUnit},
  typography: {
    fontSize: ${overrides.fontSize},
    fontWeightRegular: ${overrides.fontWeightRegular},
  },
});`;
  }, [overrides]);

  return (
    <ThemeEditorContext.Provider
      value={{ isOpen, setIsOpen, overrides, updateOverrides, resetOverrides, exportTheme, customTheme }}
    >
      {children}
    </ThemeEditorContext.Provider>
  );
};

