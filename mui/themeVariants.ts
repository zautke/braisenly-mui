import { Theme, alpha } from '@mui/material/styles';
import { Components } from '@mui/material/styles';

// ----------------------------------------------------------------------
// 1. Module Augmentation
// ----------------------------------------------------------------------

export type ThemeVariantType = 'standard' | 'glass' | 'neuromancer' | 'cardboard';

declare module '@mui/material/styles' {
  interface Theme {
    themeVariant?: ThemeVariantType;
    vars?: any;
  }
  interface ThemeOptions {
    themeVariant?: ThemeVariantType;
  }
}

// ----------------------------------------------------------------------
// 2. Variant Definitions
// ----------------------------------------------------------------------

const getGlassOverrides = (theme: Theme): Components<Theme> => ({
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(12px)',
        border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
        boxShadow: `0 4px 30px ${alpha(theme.palette.common.black, 0.1)}`,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
        backdropFilter: 'blur(16px)',
        borderRadius: 16, // More organic for glass
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: alpha(theme.palette.background.default, 0.7),
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: 'none',
      },
    },
  },
});

const getNeuromancerOverrides = (theme: Theme): Components<Theme> => ({
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`,
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        boxShadow: `0 0 5px ${theme.palette.primary.main}`,
        '&:hover': {
          boxShadow: `0 0 15px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
        },
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        textShadow: `0 0 5px ${alpha(theme.palette.text.primary, 0.3)}`,
      },
    },
  },
});

const getCardboardOverrides = (theme: Theme): Components<Theme> => ({
  MuiPaper: {
    styleOverrides: {
      root: {
        // SVG pattern for cardboard texture could be added here as backgroundImage
        backgroundColor: '#d2b48c', // Generic cardboard brown
        backgroundImage: `repeating-linear-gradient(45deg, ${alpha(theme.palette.common.black, 0.02)} 0px, ${alpha(theme.palette.common.black, 0.02)} 2px, transparent 2px, transparent 4px)`,
        border: '2px solid #8b4513',
        boxShadow: '4px 4px 0px rgba(0,0,0,0.2)', // Hard shadow
        borderRadius: 2,
      },
    },
  },
});

// ----------------------------------------------------------------------
// 3. Factory Function
// ----------------------------------------------------------------------

export const applyThemeVariant = (theme: Theme, variant: ThemeVariantType = 'standard'): Theme => {
  // 1. Tag the theme
  theme.themeVariant = variant;

  // 2. Select overrides
  let variantOverrides: Components<Theme> = {};
  
  switch (variant) {
    case 'glass':
      variantOverrides = getGlassOverrides(theme);
      break;
    case 'neuromancer':
      variantOverrides = getNeuromancerOverrides(theme);
      break;
    case 'cardboard':
      variantOverrides = getCardboardOverrides(theme);
      break;
    default:
      return theme;
  }

  // 3. Deep merge overrides (simplified for now - MUI's createTheme handles this better generally)
  // Ideally we use createTheme again to merge, but we want to modify the EXISTING theme object structure
  // or return a new one wrapped.
  
  // A safer way is to return a NEW theme that inherits from the old one plus these overrides.
  // However, since we are inside the theme creation lifecycle usually, we might just merge components.
  
  if (theme.components) {
    // Naive merge for demonstration - deep merge utility preferred in prod
    // For now, we will assume we are calling this POST-creation or during creation.
    
    // Actually, the best way is to use `createTheme` to merge the variant on top of the base theme.
    // But we need to avoid circular dependencies if we use createTheme here.
    
    // Let's rely on simple property assignment for the prototype.
    Object.keys(variantOverrides).forEach((componentKey) => {
      const cmp = componentKey as keyof Components<Theme>;
      if (!theme.components![cmp]) {
        theme.components![cmp] = {};
      }
      // Merge styleOverrides
      const existing = (theme.components![cmp] as any)?.styleOverrides || {};
      const incoming = (variantOverrides[cmp] as any)?.styleOverrides || {};
      
      // We overwrite for now to enforce the variant
      (theme.components![cmp] as any).styleOverrides = { ...existing, ...incoming };
    });
  }

  return theme;
};
