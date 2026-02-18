/**
 * themeSerializer.ts
 *
 * Provides JSON Schema definition, serialization/deserialization, and validation
 * for ThemeOverrides. Designed to be consumed by codemirror-json-schema for
 * live in-editor validation with hover tooltips.
 *
 * Zero external dependencies — pure TypeScript.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PaletteColorOverride {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface BackgroundOverride {
  default: string;
  paper: string;
  bk1?: string;
  bk2?: string;
  bk3?: string;
  bk4?: string;
}

export interface TextOverride {
  primary: string;
  secondary: string;
  disabled?: string;
}

export interface ThemeOverrides {
  primary: PaletteColorOverride;
  secondary: PaletteColorOverride;
  success: PaletteColorOverride;
  warning: PaletteColorOverride;
  error: PaletteColorOverride;
  info: PaletteColorOverride;
  background: BackgroundOverride;
  text: TextOverride;
  colorGuide: Record<string, string>;
  ext: Record<string, unknown>;
  borderRadius: number;
  spacingUnit: number;
  fontSize: number;
  fontWeightRegular: number;
  fontFamily: string;
  fontFamilyHeading: string;
  fontWeightBold: number;
  dividerColor: string;
  mode: 'light' | 'dark';
}

export interface ValidationError {
  /** JSON pointer path, e.g. "/primary/main" */
  path: string;
  /** Human-readable description of the problem */
  message: string;
  /** Error = invalid, Warning = suspicious but parseable */
  severity: 'error' | 'warning';
}

export type DeserializeResult =
  | { ok: true; data: ThemeOverrides }
  | { ok: false; errors: ValidationError[] };

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Hex color regex: #RGB, #RRGGBB, or #RRGGBBAA */
const HEX_COLOR_PATTERN = '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$';
const HEX_COLOR_RE = new RegExp(HEX_COLOR_PATTERN);

/** Palette intent keys that share the same PaletteColorOverride shape */
const PALETTE_KEYS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
] as const;

/** Sub-keys within each palette color object */
const PALETTE_COLOR_FIELDS = ['light', 'main', 'dark', 'contrastText'] as const;

// ---------------------------------------------------------------------------
// JSON Schema helpers
// ---------------------------------------------------------------------------

/** Reusable schema fragment for a single hex color string property */
function hexColorProp(description: string): Record<string, unknown> {
  return {
    type: 'string',
    pattern: HEX_COLOR_PATTERN,
    description,
  };
}

/** Schema for PaletteColorOverride */
function paletteColorSchema(intentName: string): Record<string, unknown> {
  return {
    type: 'object',
    description: `${intentName} palette — light, main, dark, and contrastText variants`,
    properties: {
      light: hexColorProp(`Light variant of the ${intentName} color`),
      main: hexColorProp(`Main ${intentName} color used throughout the UI`),
      dark: hexColorProp(`Dark variant of the ${intentName} color`),
      contrastText: hexColorProp(`Text color used on ${intentName}-colored backgrounds`),
    },
    required: ['light', 'main', 'dark', 'contrastText'],
    additionalProperties: false,
  };
}

// ---------------------------------------------------------------------------
// JSON Schema (draft-07)
// ---------------------------------------------------------------------------

/**
 * JSON Schema (draft-07) that fully describes the `ThemeOverrides` shape.
 *
 * Consumed by `codemirror-json-schema` to power live validation and
 * hover-tooltip descriptions inside the JSON editor.
 */
export const themeOverridesSchema: Record<string, unknown> = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'ThemeOverrides',
  description: 'Complete set of overrides for the MUI custom theme',
  type: 'object',
  properties: {
    // --- Palette intents ---
    primary: paletteColorSchema('primary'),
    secondary: paletteColorSchema('secondary'),
    success: paletteColorSchema('success'),
    warning: paletteColorSchema('warning'),
    error: paletteColorSchema('error'),
    info: paletteColorSchema('info'),

    // --- Background ---
    background: {
      type: 'object',
      description: 'Background colors for surfaces and layered UI elements',
      properties: {
        default: hexColorProp('Default page background color'),
        paper: hexColorProp('Background color for card / paper surfaces'),
        bk1: hexColorProp('Optional background layer 1'),
        bk2: hexColorProp('Optional background layer 2'),
        bk3: hexColorProp('Optional background layer 3'),
        bk4: hexColorProp('Optional background layer 4'),
      },
      required: ['default', 'paper'],
      additionalProperties: false,
    },

    // --- Text ---
    text: {
      type: 'object',
      description: 'Foreground text colors',
      properties: {
        primary: hexColorProp('Primary text color'),
        secondary: hexColorProp('Secondary (muted) text color'),
        disabled: hexColorProp('Text color for disabled elements'),
      },
      required: ['primary', 'secondary'],
      additionalProperties: false,
    },

    // --- Color guide (permissive) ---
    colorGuide: {
      type: 'object',
      description:
        'Named color map consumed by the theme color guide. Values may be hex, rgb(), named colors, etc.',
      additionalProperties: {
        type: 'string',
      },
    },

    // --- Extension bag (catch-all) ---
    ext: {
      type: 'object',
      description: 'Arbitrary extension data — anything goes here',
      additionalProperties: true,
    },

    // --- Numeric tokens ---
    borderRadius: {
      type: 'number',
      minimum: 0,
      maximum: 100,
      description: 'Global border-radius in px (0–100)',
    },
    spacingUnit: {
      type: 'number',
      minimum: 1,
      maximum: 32,
      description: 'Base spacing unit in px (1–32). MUI multiplies this by the spacing factor.',
    },
    fontSize: {
      type: 'number',
      minimum: 8,
      maximum: 72,
      description: 'Root font size in px (8–72)',
    },
    fontWeightRegular: {
      type: 'number',
      minimum: 100,
      maximum: 900,
      multipleOf: 100,
      description: 'Regular font weight (100–900, multiples of 100)',
    },
    fontWeightBold: {
      type: 'number',
      minimum: 100,
      maximum: 900,
      multipleOf: 100,
      description: 'Bold font weight (100–900, multiples of 100)',
    },

    // --- String tokens ---
    fontFamily: {
      type: 'string',
      minLength: 1,
      description: 'Primary font family stack (e.g. "Victor Mono Variable, monospace")',
    },
    fontFamilyHeading: {
      type: 'string',
      description: 'Font family for headings. May be empty to inherit from fontFamily.',
    },
    dividerColor: hexColorProp('Color used for dividers and thin separators'),
    mode: {
      type: 'string',
      enum: ['light', 'dark'],
      description: 'Color scheme mode — light or dark',
    },
  },
  required: [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
    'background',
    'text',
    'borderRadius',
    'spacingUnit',
    'fontSize',
    'fontWeightRegular',
    'fontWeightBold',
    'fontFamily',
    'fontFamilyHeading',
    'dividerColor',
    'mode',
  ],
  additionalProperties: false,
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Tests whether `value` is a valid hex color string.
 *
 * Accepts `#RGB`, `#RRGGBB`, and `#RRGGBBAA` forms.
 */
export function isValidHexColor(value: string): boolean {
  return HEX_COLOR_RE.test(value);
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Validates a parsed (but untyped) value against the ThemeOverrides shape.
 *
 * Never throws — always returns an array of `ValidationError`.
 * An empty array means the value is valid.
 */
export function validateOverrides(parsed: unknown): ValidationError[] {
  const errors: ValidationError[] = [];

  // ---- Top-level type check ----
  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    errors.push({ path: '', message: 'Root value must be a JSON object', severity: 'error' });
    return errors;
  }

  const obj = parsed as Record<string, unknown>;

  // ---- Helper closures ----

  /** Push an error */
  const err = (path: string, message: string, severity: 'error' | 'warning' = 'error') =>
    errors.push({ path, message, severity });

  /** Check that a key exists on `obj` */
  const requireKey = (key: string): boolean => {
    if (!(key in obj)) {
      err(`/${key}`, `Missing required property "${key}"`);
      return false;
    }
    return true;
  };

  /** Assert a value is a string */
  const isString = (value: unknown): value is string => typeof value === 'string';

  /** Assert a value is a number */
  const isNumber = (value: unknown): value is number => typeof value === 'number' && !Number.isNaN(value);

  /** Validate a hex color at a given path */
  const checkHex = (path: string, value: unknown) => {
    if (!isString(value)) {
      err(path, `Expected a hex color string, got ${typeof value}`);
    } else if (!isValidHexColor(value)) {
      err(path, `"${value}" is not a valid hex color (#RGB, #RRGGBB, or #RRGGBBAA)`);
    }
  };

  /** Validate a numeric field with min/max and optional multipleOf */
  const checkNumber = (
    path: string,
    value: unknown,
    min: number,
    max: number,
    step?: number,
  ) => {
    if (!isNumber(value)) {
      err(path, `Expected a number, got ${typeof value}`);
      return;
    }
    if (value < min || value > max) {
      err(path, `Value ${value} is out of range (${min}–${max})`);
    }
    if (step !== undefined && value % step !== 0) {
      err(path, `Value ${value} must be a multiple of ${step}`);
    }
  };

  /** Validate a PaletteColorOverride object */
  const checkPalette = (key: string) => {
    if (!requireKey(key)) return;
    const val = obj[key];
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      err(`/${key}`, `"${key}" must be an object with light, main, dark, contrastText`);
      return;
    }
    const palette = val as Record<string, unknown>;
    for (const field of PALETTE_COLOR_FIELDS) {
      const fieldPath = `/${key}/${field}`;
      if (!(field in palette)) {
        err(fieldPath, `Missing required property "${field}" in ${key}`);
      } else {
        checkHex(fieldPath, palette[field]);
      }
    }
  };

  // ---- Palette intents ----
  for (const key of PALETTE_KEYS) {
    checkPalette(key);
  }

  // ---- Background ----
  if (requireKey('background')) {
    const bg = obj.background;
    if (bg === null || typeof bg !== 'object' || Array.isArray(bg)) {
      err('/background', '"background" must be an object');
    } else {
      const bgObj = bg as Record<string, unknown>;
      // Required
      for (const field of ['default', 'paper'] as const) {
        const p = `/background/${field}`;
        if (!(field in bgObj)) {
          err(p, `Missing required property "${field}" in background`);
        } else {
          checkHex(p, bgObj[field]);
        }
      }
      // Optional
      for (const field of ['bk1', 'bk2', 'bk3', 'bk4'] as const) {
        if (field in bgObj) {
          checkHex(`/background/${field}`, bgObj[field]);
        }
      }
    }
  }

  // ---- Text ----
  if (requireKey('text')) {
    const txt = obj.text;
    if (txt === null || typeof txt !== 'object' || Array.isArray(txt)) {
      err('/text', '"text" must be an object');
    } else {
      const txtObj = txt as Record<string, unknown>;
      for (const field of ['primary', 'secondary'] as const) {
        const p = `/text/${field}`;
        if (!(field in txtObj)) {
          err(p, `Missing required property "${field}" in text`);
        } else {
          checkHex(p, txtObj[field]);
        }
      }
      if ('disabled' in txtObj) {
        checkHex('/text/disabled', txtObj.disabled);
      }
    }
  }

  // ---- colorGuide (optional, permissive) ----
  if ('colorGuide' in obj) {
    const cg = obj.colorGuide;
    if (cg === null || typeof cg !== 'object' || Array.isArray(cg)) {
      err('/colorGuide', '"colorGuide" must be an object');
    } else {
      const cgObj = cg as Record<string, unknown>;
      for (const [k, v] of Object.entries(cgObj)) {
        if (!isString(v)) {
          err(`/colorGuide/${k}`, `Value for "${k}" must be a string, got ${typeof v}`);
        }
      }
    }
  }

  // ---- ext (optional, catch-all) ----
  if ('ext' in obj) {
    const ext = obj.ext;
    if (ext === null || typeof ext !== 'object' || Array.isArray(ext)) {
      err('/ext', '"ext" must be an object');
    }
  }

  // ---- Numeric tokens ----
  if (requireKey('borderRadius')) checkNumber('/borderRadius', obj.borderRadius, 0, 100);
  if (requireKey('spacingUnit')) checkNumber('/spacingUnit', obj.spacingUnit, 1, 32);
  if (requireKey('fontSize')) checkNumber('/fontSize', obj.fontSize, 8, 72);
  if (requireKey('fontWeightRegular'))
    checkNumber('/fontWeightRegular', obj.fontWeightRegular, 100, 900, 100);
  if (requireKey('fontWeightBold'))
    checkNumber('/fontWeightBold', obj.fontWeightBold, 100, 900, 100);

  // ---- String tokens ----
  if (requireKey('fontFamily')) {
    if (!isString(obj.fontFamily)) {
      err('/fontFamily', 'fontFamily must be a string');
    } else if (obj.fontFamily.length === 0) {
      err('/fontFamily', 'fontFamily must not be empty');
    }
  }

  if (requireKey('fontFamilyHeading')) {
    if (!isString(obj.fontFamilyHeading)) {
      err('/fontFamilyHeading', 'fontFamilyHeading must be a string');
    }
    // Empty string is explicitly allowed for fontFamilyHeading
  }

  if (requireKey('dividerColor')) {
    checkHex('/dividerColor', obj.dividerColor);
  }

  // ---- Mode ----
  if (requireKey('mode')) {
    if (!isString(obj.mode)) {
      err('/mode', 'mode must be a string');
    } else if (obj.mode !== 'light' && obj.mode !== 'dark') {
      err('/mode', `mode must be "light" or "dark", got "${obj.mode}"`);
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Serialization
// ---------------------------------------------------------------------------

/**
 * Serializes a `ThemeOverrides` object to a formatted JSON string.
 *
 * Uses 2-space indentation for readability inside the editor.
 * The output is a clean round-trip: `deserializeOverrides(serializeOverrides(x)).data === x`
 */
export function serializeOverrides(overrides: ThemeOverrides): string {
  return JSON.stringify(overrides, null, 2);
}

/**
 * Deserializes a JSON string into a validated `ThemeOverrides` object.
 *
 * 1. Parses the JSON — returns a parse error on failure.
 * 2. Runs `validateOverrides` — returns validation errors on failure.
 * 3. Returns `{ ok: true, data }` when everything checks out.
 */
export function deserializeOverrides(json: string): DeserializeResult {
  // Step 1: Parse
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (e: unknown) {
    const message =
      e instanceof Error ? `Invalid JSON: ${e.message}` : 'Invalid JSON: unknown parse error';
    return {
      ok: false,
      errors: [{ path: '', message, severity: 'error' }],
    };
  }

  // Step 2: Validate
  const validationErrors = validateOverrides(parsed);
  if (validationErrors.length > 0) {
    return { ok: false, errors: validationErrors };
  }

  // Step 3: Success
  return { ok: true, data: parsed as ThemeOverrides };
}
