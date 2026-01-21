---
title: SEM-mui7-compliance
tags: [semantic, mui, mui7, migration, selectors, styling, critical]
type: semantic
last_verified: 2026-01-19
---

# Semantic: MUI 7 Compliance Facts

## AGENT QUICK-REFERENCE
1. `$checked` -> `.Mui-checked` (all state selectors)
2. `theme.spacing.unit * n` -> `theme.spacing(n)` (returns string)
3. JSS `$` prefix removed in Emotion migration
4. Component part selectors: `.MuiComponent-partName`

---

## Selector Migration Facts

### State Selectors
| Old (JSS) | New (Emotion/CSS) | Purpose |
|-----------|-------------------|---------|
| `$checked` | `.Mui-checked` | Checked state |
| `$disabled` | `.Mui-disabled` | Disabled state |
| `$error` | `.Mui-error` | Error state |
| `$focused` | `.Mui-focused` | Focus state |
| `$focusVisible` | `.Mui-focusVisible` | Keyboard focus |
| `$selected` | `.Mui-selected` | Selected state |

### Component Part Selectors
| Old (JSS) | New (Emotion/CSS) | Component |
|-----------|-------------------|-----------|
| `$track` | `.MuiSwitch-track` | Switch |
| `$thumb` | `.MuiSwitch-thumb` | Switch |
| `$input` | `.MuiSwitch-input` | Switch |

### Pattern
Old JSS pattern:
```javascript
'&$checked': { color: 'green' }
'& + $track': { backgroundColor: 'blue' }
```

New Emotion pattern:
```javascript
'&.Mui-checked': { color: 'green' }
'& + .MuiSwitch-track': { backgroundColor: 'blue' }
```

---

## Spacing API Facts

### Old API (MUI 4/early 5)
```javascript
paddingTop: `${theme.spacing.unit * 6}px`
// theme.spacing.unit was a number (default 8)
```

### New API (MUI 5+/7)
```javascript
paddingTop: theme.spacing(6)
// Returns string with units: "48px"
```

### Key Differences
- `spacing.unit` was a **number** (8 by default)
- `spacing(n)` is a **function** returning a **string**
- No need to concatenate `px` - it's included

---

## Migration Checklist

```bash
# Find deprecated $ selectors
grep -r '\$checked\|\$disabled\|\$error' componentOverrides/

# Find deprecated spacing.unit
grep -r 'spacing\.unit' componentOverrides/
```

---

## Relations

- applies_to [[customTheme project]]
- validated_by [[SESSION-2026-01-19-mui-theme-demo]]
