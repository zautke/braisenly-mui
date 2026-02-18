import { describe, it, expect } from 'vitest';
import {
  isValidHexColor,
  serializeOverrides,
  deserializeOverrides,
  validateOverrides,
  type ThemeOverrides,
} from './themeSerializer';

// ---------------------------------------------------------------------------
// Shared fixture
// ---------------------------------------------------------------------------

const validOverrides: ThemeOverrides = {
  primary: { light: '#bbdefb', main: '#1976d2', dark: '#0d47a1', contrastText: '#ffffff' },
  secondary: { light: '#f48fb1', main: '#e91e63', dark: '#880e4f', contrastText: '#ffffff' },
  success: { light: '#81c784', main: '#4caf50', dark: '#2e7d32', contrastText: '#ffffff' },
  warning: { light: '#ffb74d', main: '#ff9800', dark: '#e65100', contrastText: '#000000' },
  error: { light: '#ef5350', main: '#f44336', dark: '#c62828', contrastText: '#ffffff' },
  info: { light: '#4fc3f7', main: '#03a9f4', dark: '#01579b', contrastText: '#ffffff' },
  background: { default: '#ffffff', paper: '#f5f5f5', bk1: '#e0e0e0' },
  text: { primary: '#212121', secondary: '#757575', disabled: '#bdbdbd' },
  colorGuide: { brand: '#1976d2', accent: 'rebeccapurple' },
  ext: { customProp: 'hello' },
  borderRadius: 8,
  spacingUnit: 8,
  fontSize: 14,
  fontWeightRegular: 400,
  fontWeightBold: 700,
  fontFamily: '"Roboto", sans-serif',
  fontFamilyHeading: '',
  dividerColor: '#e0e0e0',
  mode: 'light',
};

// ---------------------------------------------------------------------------
// 1. isValidHexColor
// ---------------------------------------------------------------------------

describe('isValidHexColor', () => {
  it.each([
    ['#fff', true],
    ['#FFF', true],
    ['#ff00ff', true],
    ['#FF00FF', true],
    ['#ff00ff80', true],  // 8-digit with alpha
  ])('returns true for valid hex color %s', (input, expected) => {
    expect(isValidHexColor(input)).toBe(expected);
  });

  it.each([
    ['fff', false],          // no hash
    ['#ffff', false],        // 4 digits
    ['#gggggg', false],      // invalid chars
    ['red', false],          // named color
    ['rgb(0,0,0)', false],   // rgb()
    ['', false],             // empty string
  ])('returns false for invalid hex color %s', (input, expected) => {
    expect(isValidHexColor(input)).toBe(expected);
  });
});

// ---------------------------------------------------------------------------
// 2. serializeOverrides + deserializeOverrides round-trip
// ---------------------------------------------------------------------------

describe('serializeOverrides + deserializeOverrides round-trip', () => {
  it('round-trips a fully populated ThemeOverrides object', () => {
    const json = serializeOverrides(validOverrides);
    const result = deserializeOverrides(json);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data).toEqual(validOverrides);
    }
  });
});

// ---------------------------------------------------------------------------
// 3. deserializeOverrides — JSON parse errors
// ---------------------------------------------------------------------------

describe('deserializeOverrides — JSON parse errors', () => {
  it.each([
    'not json at all',
    '{ unclosed',
    '',
  ])('returns ok: false with Invalid JSON error for input: %j', (input) => {
    const result = deserializeOverrides(input);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].severity).toBe('error');
      expect(result.errors[0].message).toMatch(/^Invalid JSON/);
    }
  });
});

// ---------------------------------------------------------------------------
// 4. deserializeOverrides — schema validation errors
// ---------------------------------------------------------------------------

describe('deserializeOverrides — schema validation errors', () => {
  it('reports errors for missing required fields when given empty object', () => {
    const result = deserializeOverrides('{}');

    expect(result.ok).toBe(false);
    if (!result.ok) {
      // Should have errors for every required top-level field
      const missingFields = [
        'primary', 'secondary', 'success', 'warning', 'error', 'info',
        'background', 'text',
        'borderRadius', 'spacingUnit', 'fontSize',
        'fontWeightRegular', 'fontWeightBold',
        'fontFamily', 'fontFamilyHeading',
        'dividerColor', 'mode',
      ];
      for (const field of missingFields) {
        expect(
          result.errors.some((e) => e.path === `/${field}` && e.message.includes('Missing')),
        ).toBe(true);
      }
    }
  });

  it('reports error for invalid hex color in palette', () => {
    const override = {
      ...validOverrides,
      primary: { ...validOverrides.primary, main: 'red' },
    };
    const result = deserializeOverrides(JSON.stringify(override));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(
        result.errors.some(
          (e) => e.path === '/primary/main' && e.message.includes('not a valid hex color'),
        ),
      ).toBe(true);
    }
  });

  it('reports range error for out-of-range borderRadius', () => {
    const override = { ...validOverrides, borderRadius: 999 };
    const result = deserializeOverrides(JSON.stringify(override));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(
        result.errors.some(
          (e) => e.path === '/borderRadius' && e.message.includes('out of range'),
        ),
      ).toBe(true);
    }
  });

  it('reports error for invalid mode value', () => {
    const override = { ...validOverrides, mode: 'auto' };
    const result = deserializeOverrides(JSON.stringify(override));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(
        result.errors.some(
          (e) => e.path === '/mode' && e.message.includes('"light" or "dark"'),
        ),
      ).toBe(true);
    }
  });

  it('reports multiple-of-100 error for fontWeightRegular', () => {
    const override = { ...validOverrides, fontWeightRegular: 350 };
    const result = deserializeOverrides(JSON.stringify(override));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(
        result.errors.some(
          (e) => e.path === '/fontWeightRegular' && e.message.includes('multiple of 100'),
        ),
      ).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// 5. validateOverrides — edge cases
// ---------------------------------------------------------------------------

describe('validateOverrides — edge cases', () => {
  it('returns root-level error for null input', () => {
    const errors = validateOverrides(null);
    expect(errors).toHaveLength(1);
    expect(errors[0].path).toBe('');
    expect(errors[0].message).toMatch(/Root value must be a JSON object/);
  });

  it('returns root-level error for array input', () => {
    const errors = validateOverrides([1, 2, 3]);
    expect(errors).toHaveLength(1);
    expect(errors[0].path).toBe('');
    expect(errors[0].message).toMatch(/Root value must be a JSON object/);
  });

  it('returns root-level error for string input', () => {
    const errors = validateOverrides('hello');
    expect(errors).toHaveLength(1);
    expect(errors[0].path).toBe('');
    expect(errors[0].message).toMatch(/Root value must be a JSON object/);
  });

  it('returns empty array for a valid object with all required fields', () => {
    const errors = validateOverrides(validOverrides);
    expect(errors).toEqual([]);
  });

  it('reports errors when colorGuide values are non-string', () => {
    const override = { ...validOverrides, colorGuide: { brand: 123, accent: true } };
    const errors = validateOverrides(override);

    expect(errors.some((e) => e.path === '/colorGuide/brand' && e.message.includes('must be a string'))).toBe(true);
    expect(errors.some((e) => e.path === '/colorGuide/accent' && e.message.includes('must be a string'))).toBe(true);
  });

  it('reports error when ext is an array', () => {
    const override = { ...validOverrides, ext: [1, 2, 3] };
    const errors = validateOverrides(override);

    expect(errors.some((e) => e.path === '/ext' && e.message.includes('"ext" must be an object'))).toBe(true);
  });

  it('reports error when fontFamily is empty string', () => {
    const override = { ...validOverrides, fontFamily: '' };
    const errors = validateOverrides(override);

    expect(errors.some((e) => e.path === '/fontFamily' && e.message.includes('must not be empty'))).toBe(true);
  });

  it('does NOT report error when fontFamilyHeading is empty string', () => {
    const override = { ...validOverrides, fontFamilyHeading: '' };
    const errors = validateOverrides(override);

    // fontFamilyHeading empty is explicitly allowed — no error for that path
    expect(errors.some((e) => e.path === '/fontFamilyHeading')).toBe(false);
  });
});
