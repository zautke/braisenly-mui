# Protocol: Agentic Theme Import (Design Tokens -> MUI Demo)

Purpose: standard steps for importing a new design-tokens theme into this repo and ensuring it appears in the demo theme switcher.

## Steps
1. Identify source tokens
   - Locate the theme tokens in `../design-system/design-tokens`.
   - Prefer semantic tokens (e.g., `--primary`, `--background`, `--foreground`) over raw palette values.

2. Create a demo theme file
   - Add a new file in `demo/src/themes/<theme-name>.ts`.
   - Use `createTheme` and map tokens to MUI `palette`, `typography`, and minimal `components`.
   - Import `styleOverrides` from `@braisenly/mui` to keep base overrides consistent.

3. Wire the theme into the demo
   - Update `demo/src/ThemeContext.tsx`:
     - Add the import.
     - Extend the `ThemeName` union.
     - Add a `case` in the `useMemo` switch.
   - Update `demo/src/App.tsx`:
     - Add a menu item to the theme selector.

4. Validate visibility (manual)
   - Confirm the theme appears in the selector.
   - Switch to the theme and verify the palette changes in the demo UI.

5. Document the addition
   - Add or update a short note in Basic Memory with the new theme name and source token path.

## Mapping guidance
- `primary.main` -> `--primary`
- `primary.contrastText` -> `--primary-foreground`
- `secondary.main` -> `--secondary` (or `--accent` if the theme defines a stronger secondary accent)
- `background.default` -> `--background`
- `background.paper` -> `--card`
- `text.primary` -> `--foreground`
- `text.secondary` -> `--muted-foreground`
- `divider` -> `--border`
- `error`, `warning`, `info`, `success` -> `--destructive`, `--warning`, `--info`, `--success`

## Done criteria
- New theme file exists in `demo/src/themes/`.
- Theme is selectable in the demo and renders correctly.
