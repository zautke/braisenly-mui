import { describe, it, expect } from 'vitest';
import { createTheme } from '@mui/material/styles';
import { styleOverrides } from '@braisenly/mui';

// Evidence-based guarantee:
// We verify that the critical overrides are actually present in the generated theme object.

describe('MUI 7 Theme Integrity', () => {
  const theme = createTheme({
    components: styleOverrides
  });

  it('should have the Accordion component renamed from ExpansionPanel', () => {
    expect(theme.components?.MuiAccordion).toBeDefined();
    expect((theme.components as any)?.MuiExpansionPanel).toBeUndefined();
  });

  it('should have modern CSS class selectors in Button overrides', () => {
    const buttonStyle = theme.components?.MuiButton?.styleOverrides?.root;
    // We expect '&.Mui-disabled' instead of '&$disabled'
    const str = JSON.stringify(buttonStyle);
    expect(str).toContain('&.Mui-disabled');
    expect(str).not.toContain('&$disabled');
  });

  it('should have bleeding edge animation in Switch', () => {
    const switchBase = theme.components?.MuiSwitch?.styleOverrides?.switchBase;
    const str = JSON.stringify(switchBase);
    // iOS toggle transform
    expect(str).toContain('translateX(16px)');
  });

  it('should have Z-Depth configured', () => {
    // Check if we can access the custom zDepth (requires TS ignore or module augmentation in test)
    // For this test, we check if the Card override uses it.
    const cardRoot = theme.components?.MuiCard?.styleOverrides?.root;
    // We expect a box-shadow definition
    expect(cardRoot).toHaveProperty('boxShadow');
  });
});