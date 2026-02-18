/**
 * ThemeEditorContext — State engine for live theme customization
 *
 * Architecture:
 *   useReducer FSM with 4 validation states (VALID, VALIDATING, INVALID_JSON, INVALID_SCHEMA)
 *   Bidirectional sync between control tabs and JSON editor via source tracking
 *   localStorage persistence per-theme
 *   Debounced createTheme() for JSON editor keystrokes
 *
 * Blackboard contract:
 *   - ThemeOverrides: expanded with fontFamily, fontFamilyHeading, fontWeightBold, dividerColor, mode
 *   - EditorValidationStatus: 'valid' | 'validating' | 'invalid_json' | 'invalid_schema'
 *   - Source tracking: 'json' | 'control' | 'reset' | 'switch' | 'persist'
 */
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { createTheme, Theme } from '@mui/material/styles';
import {
  type ThemeOverrides,
  type PaletteColorOverride,
  type BackgroundOverride,
  type TextOverride,
  type ValidationError,
  serializeOverrides,
  deserializeOverrides,
  validateOverrides,
} from './themeSerializer';

// Re-export types that consumers need
export type { ThemeOverrides, PaletteColorOverride, BackgroundOverride, TextOverride, ValidationError };

// ---------------------------------------------------------------------------
// Validation status (FSM states)
// ---------------------------------------------------------------------------

export type EditorValidationStatus = 'valid' | 'validating' | 'invalid_json' | 'invalid_schema';

// ---------------------------------------------------------------------------
// Source tracking (prevents sync loops)
// ---------------------------------------------------------------------------

export type EditSource = 'json' | 'control' | 'reset' | 'switch' | 'persist';

// ---------------------------------------------------------------------------
// Extraction helpers
// ---------------------------------------------------------------------------

const extractPaletteColor = (paletteColor: unknown): PaletteColorOverride => {
  const pc = paletteColor as Record<string, unknown> | undefined;
  return {
    light: (pc?.light as string) || '#ffffff',
    main: (pc?.main as string) || '#1976d2',
    dark: (pc?.dark as string) || '#000000',
    contrastText: (pc?.contrastText as string) || '#ffffff',
  };
};

const extractBackground = (bg: unknown): BackgroundOverride => {
  const b = bg as Record<string, unknown> | undefined;
  return {
    default: (b?.default as string) || '#ffffff',
    paper: (b?.paper as string) || '#f5f5f5',
    bk1: b?.bk1 as string | undefined,
    bk2: b?.bk2 as string | undefined,
    bk3: b?.bk3 as string | undefined,
    bk4: b?.bk4 as string | undefined,
  };
};

const extractText = (text: unknown): TextOverride => {
  const t = text as Record<string, unknown> | undefined;
  return {
    primary: (t?.primary as string) || '#000000',
    secondary: (t?.secondary as string) || '#666666',
    disabled: t?.disabled as string | undefined,
  };
};

/** Extract a ThemeOverrides from a resolved MUI Theme */
export const extractOverridesFromTheme = (theme: Theme): ThemeOverrides => ({
  primary: extractPaletteColor(theme.palette.primary),
  secondary: extractPaletteColor(theme.palette.secondary),
  success: extractPaletteColor(theme.palette.success),
  warning: extractPaletteColor(theme.palette.warning),
  error: extractPaletteColor(theme.palette.error),
  info: extractPaletteColor(theme.palette.info),
  background: extractBackground(theme.palette.background),
  text: extractText(theme.palette.text),
  colorGuide: (theme.palette as unknown as Record<string, unknown>).colorGuide as Record<string, string> || {},
  ext: (theme.palette as unknown as Record<string, unknown>).ext as Record<string, unknown> || {},
  borderRadius: (theme.shape?.borderRadius as number) || 4,
  spacingUnit: 8,
  fontSize: (theme.typography?.fontSize as number) || 14,
  fontWeightRegular: (theme.typography?.fontWeightRegular as number) || 400,
  // New fields
  fontFamily: (theme.typography?.fontFamily as string) || 'system-ui, sans-serif',
  fontFamilyHeading: '',
  fontWeightBold: (theme.typography?.fontWeightBold as number) || 700,
  dividerColor: theme.palette.divider || '#e0e0e0',
  mode: theme.palette.mode || 'light',
});

// ---------------------------------------------------------------------------
// Reducer state & actions
// ---------------------------------------------------------------------------

interface EditorState {
  /** Last successfully validated overrides */
  overrides: ThemeOverrides;
  /** Raw JSON string shown in the CodeMirror editor */
  rawJson: string;
  /** Current FSM validation status */
  validationStatus: EditorValidationStatus;
  /** Validation errors (empty when valid) */
  validationErrors: ValidationError[];
  /** Whether the editor drawer is open */
  isOpen: boolean;
  /** Tracks which input source triggered the last change */
  lastSource: EditSource;
}

type EditorAction =
  | { type: 'USER_EDIT_JSON'; rawJson: string }
  | { type: 'USER_EDIT_CONTROL'; overrides: Partial<ThemeOverrides> }
  | { type: 'VALIDATION_PASS'; overrides: ThemeOverrides; rawJson: string }
  | { type: 'JSON_PARSE_FAIL'; errors: ValidationError[] }
  | { type: 'SCHEMA_CHECK_FAIL'; errors: ValidationError[]; rawJson: string }
  | { type: 'THEME_SWITCH'; overrides: ThemeOverrides }
  | { type: 'RESET'; overrides: ThemeOverrides }
  | { type: 'LOAD_PERSISTED'; overrides: ThemeOverrides }
  | { type: 'SET_OPEN'; isOpen: boolean };

/** Deep merge helper for nested objects */
function deepMerge(target: ThemeOverrides, source: Partial<ThemeOverrides>): ThemeOverrides {
  const result: Record<string, unknown> = { ...target };
  for (const key in source) {
    const sourceVal = (source as unknown as Record<string, unknown>)[key];
    const targetVal = (target as unknown as Record<string, unknown>)[key];
    if (sourceVal && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
      result[key] = {
        ...((targetVal && typeof targetVal === 'object') ? targetVal : {}),
        ...sourceVal,
      };
    } else {
      result[key] = sourceVal;
    }
  }
  return result as unknown as ThemeOverrides;
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'USER_EDIT_JSON':
      return {
        ...state,
        rawJson: action.rawJson,
        validationStatus: 'validating',
        lastSource: 'json',
      };

    case 'USER_EDIT_CONTROL': {
      const merged = deepMerge(state.overrides, action.overrides);
      return {
        ...state,
        overrides: merged,
        rawJson: serializeOverrides(merged),
        validationStatus: 'valid',
        validationErrors: [],
        lastSource: 'control',
      };
    }

    case 'VALIDATION_PASS':
      return {
        ...state,
        overrides: action.overrides,
        rawJson: action.rawJson,
        validationStatus: 'valid',
        validationErrors: [],
        lastSource: 'json',
      };

    case 'JSON_PARSE_FAIL':
      return {
        ...state,
        validationStatus: 'invalid_json',
        validationErrors: action.errors,
        lastSource: 'json',
        // overrides and rawJson preserved — keep last valid theme rendering
      };

    case 'SCHEMA_CHECK_FAIL':
      return {
        ...state,
        rawJson: action.rawJson,
        validationStatus: 'invalid_schema',
        validationErrors: action.errors,
        lastSource: 'json',
        // overrides preserved — keep last valid theme rendering
      };

    case 'THEME_SWITCH':
      return {
        ...state,
        overrides: action.overrides,
        rawJson: serializeOverrides(action.overrides),
        validationStatus: 'valid',
        validationErrors: [],
        lastSource: 'switch',
      };

    case 'RESET':
      return {
        ...state,
        overrides: action.overrides,
        rawJson: serializeOverrides(action.overrides),
        validationStatus: 'valid',
        validationErrors: [],
        lastSource: 'reset',
      };

    case 'LOAD_PERSISTED':
      return {
        ...state,
        overrides: action.overrides,
        rawJson: serializeOverrides(action.overrides),
        validationStatus: 'valid',
        validationErrors: [],
        lastSource: 'persist',
      };

    case 'SET_OPEN':
      return {
        ...state,
        isOpen: action.isOpen,
      };

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

const STORAGE_PREFIX = 'mui-theme-demo:overrides:';

function loadPersistedOverrides(themeName: string): ThemeOverrides | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${themeName}`);
    if (!raw) return null;
    const result = deserializeOverrides(raw);
    if (result.ok) return result.data;
    // Persisted data is corrupt — discard silently
    localStorage.removeItem(`${STORAGE_PREFIX}${themeName}`);
    return null;
  } catch {
    return null;
  }
}

function persistOverrides(themeName: string, overrides: ThemeOverrides): void {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${themeName}`, serializeOverrides(overrides));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

// ---------------------------------------------------------------------------
// Context interface
// ---------------------------------------------------------------------------

interface ThemeEditorContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  overrides: ThemeOverrides;
  rawJson: string;
  validationStatus: EditorValidationStatus;
  validationErrors: ValidationError[];
  lastSource: EditSource;
  updateOverrides: (partial: Partial<ThemeOverrides>) => void;
  updateFromJson: (json: string) => void;
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

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface ThemeEditorProviderProps {
  children: React.ReactNode;
  baseTheme: Theme;
  themeName: string;
}

export const ThemeEditorProvider: React.FC<ThemeEditorProviderProps> = ({
  children,
  baseTheme,
  themeName,
}) => {
  // Compute initial overrides: try localStorage first, fall back to base theme extraction
  const initialOverrides = useMemo(() => {
    const persisted = loadPersistedOverrides(themeName);
    return persisted || extractOverridesFromTheme(baseTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- intentionally only on mount

  const initialState: EditorState = useMemo(
    () => ({
      overrides: initialOverrides,
      rawJson: serializeOverrides(initialOverrides),
      validationStatus: 'valid' as EditorValidationStatus,
      validationErrors: [],
      isOpen: false,
      lastSource: 'persist' as EditSource,
    }),
    [initialOverrides],
  );

  const [state, dispatch] = useReducer(editorReducer, initialState);

  // Debounce ref for JSON editor changes
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track current themeName for localStorage key
  const themeNameRef = useRef(themeName);
  themeNameRef.current = themeName;

  // ---------------------------------------------------------------------------
  // Handle base theme switch: reset overrides (or load persisted for new theme)
  // ---------------------------------------------------------------------------
  const prevThemeNameRef = useRef(themeName);
  useEffect(() => {
    if (prevThemeNameRef.current !== themeName) {
      prevThemeNameRef.current = themeName;
      const persisted = loadPersistedOverrides(themeName);
      if (persisted) {
        dispatch({ type: 'LOAD_PERSISTED', overrides: persisted });
      } else {
        dispatch({ type: 'THEME_SWITCH', overrides: extractOverridesFromTheme(baseTheme) });
      }
    }
  }, [themeName, baseTheme]);

  // ---------------------------------------------------------------------------
  // Persist overrides to localStorage on valid changes
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (state.validationStatus === 'valid') {
      persistOverrides(themeNameRef.current, state.overrides);
    }
  }, [state.overrides, state.validationStatus]);

  // ---------------------------------------------------------------------------
  // Debounced validation for JSON editor input
  // ---------------------------------------------------------------------------
  const validateJsonDebounced = useCallback((rawJson: string) => {
    // Clear any pending timer
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      const result = deserializeOverrides(rawJson);
      if (result.ok) {
        dispatch({ type: 'VALIDATION_PASS', overrides: result.data, rawJson });
      } else {
        // Distinguish between JSON parse error and schema error
        const hasJsonParseError = result.errors.some(
          (e) => e.path === '' && e.message.startsWith('Invalid JSON'),
        );
        if (hasJsonParseError) {
          dispatch({ type: 'JSON_PARSE_FAIL', errors: result.errors });
        } else {
          dispatch({ type: 'SCHEMA_CHECK_FAIL', errors: result.errors, rawJson });
        }
      }
    }, 300);
  }, []);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Public API methods
  // ---------------------------------------------------------------------------

  const setIsOpen = useCallback((open: boolean) => {
    dispatch({ type: 'SET_OPEN', isOpen: open });
  }, []);

  /** Update from control tabs — immediate, always valid */
  const updateOverrides = useCallback((partial: Partial<ThemeOverrides>) => {
    dispatch({ type: 'USER_EDIT_CONTROL', overrides: partial });
  }, []);

  /** Update from JSON editor — debounced validation */
  const updateFromJson = useCallback(
    (json: string) => {
      dispatch({ type: 'USER_EDIT_JSON', rawJson: json });
      validateJsonDebounced(json);
    },
    [validateJsonDebounced],
  );

  /** Reset to base theme (clears localStorage for this theme) */
  const resetOverrides = useCallback(() => {
    const fresh = extractOverridesFromTheme(baseTheme);
    dispatch({ type: 'RESET', overrides: fresh });
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${themeNameRef.current}`);
    } catch {
      // ignore
    }
  }, [baseTheme]);

  /** Export current overrides as TypeScript code string */
  const exportTheme = useCallback(() => {
    const o = state.overrides;
    return `// Generated Theme Configuration
// Full theme overrides including light/main/dark variants
const themeOverrides = ${JSON.stringify(o, null, 2)};

export const customTheme = createTheme({
  palette: {
    mode: "${o.mode}",
    primary: ${JSON.stringify(o.primary, null, 4)},
    secondary: ${JSON.stringify(o.secondary, null, 4)},
    success: ${JSON.stringify(o.success, null, 4)},
    warning: ${JSON.stringify(o.warning, null, 4)},
    error: ${JSON.stringify(o.error, null, 4)},
    info: ${JSON.stringify(o.info, null, 4)},
    background: ${JSON.stringify(o.background, null, 4)},
    text: ${JSON.stringify(o.text, null, 4)},
    divider: "${o.dividerColor}",
    colorGuide: { /* ${Object.keys(o.colorGuide).length} colors */ },
    ext: ${JSON.stringify(o.ext, null, 4)},
  },
  shape: { borderRadius: ${o.borderRadius} },
  spacing: ${o.spacingUnit},
  typography: {
    fontFamily: "${o.fontFamily}",
    fontSize: ${o.fontSize},
    fontWeightRegular: ${o.fontWeightRegular},
    fontWeightBold: ${o.fontWeightBold},
  },
});`;
  }, [state.overrides]);

  // ---------------------------------------------------------------------------
  // Build the MUI Theme from last-valid overrides
  // ---------------------------------------------------------------------------
  const customTheme = useMemo(() => {
    const o = state.overrides;
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode: o.mode,
        primary: { ...o.primary },
        secondary: { ...o.secondary },
        success: { ...o.success },
        warning: { ...o.warning },
        error: { ...o.error },
        info: { ...o.info },
        background: { ...o.background },
        text: { ...o.text },
        divider: o.dividerColor,
        colorGuide: o.colorGuide,
        ext: o.ext,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      shape: { borderRadius: o.borderRadius },
      spacing: o.spacingUnit,
      typography: {
        ...baseTheme.typography,
        fontFamily: o.fontFamily,
        fontSize: o.fontSize,
        fontWeightRegular: o.fontWeightRegular,
        fontWeightBold: o.fontWeightBold,
        ...(o.fontFamilyHeading
          ? {
              h1: { fontFamily: o.fontFamilyHeading },
              h2: { fontFamily: o.fontFamilyHeading },
              h3: { fontFamily: o.fontFamilyHeading },
              h4: { fontFamily: o.fontFamilyHeading },
              h5: { fontFamily: o.fontFamilyHeading },
              h6: { fontFamily: o.fontFamilyHeading },
            }
          : {}),
      },
    });
  }, [baseTheme, state.overrides]);

  // ---------------------------------------------------------------------------
  // Context value (memoized to prevent unnecessary re-renders)
  // ---------------------------------------------------------------------------
  const contextValue = useMemo<ThemeEditorContextType>(
    () => ({
      isOpen: state.isOpen,
      setIsOpen,
      overrides: state.overrides,
      rawJson: state.rawJson,
      validationStatus: state.validationStatus,
      validationErrors: state.validationErrors,
      lastSource: state.lastSource,
      updateOverrides,
      updateFromJson,
      resetOverrides,
      exportTheme,
      customTheme,
    }),
    [
      state.isOpen,
      state.overrides,
      state.rawJson,
      state.validationStatus,
      state.validationErrors,
      state.lastSource,
      setIsOpen,
      updateOverrides,
      updateFromJson,
      resetOverrides,
      exportTheme,
      customTheme,
    ],
  );

  return (
    <ThemeEditorContext.Provider value={contextValue}>
      {children}
    </ThemeEditorContext.Provider>
  );
};
