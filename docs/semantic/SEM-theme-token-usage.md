# MUI Theme Token Semantic Usage Guide

This document codifies the **semantic meaning** and **intended usage** of MUI theme tokens within this design system. It bridges the gap between technical property names (e.g., `body2`) and design intent (e.g., "image captions").

## 1. Typography

| Token | Semantic Role | Best Usage Examples |
|-------|---------------|---------------------|
| `h1` | **Page Title** | The single main heading of a screen. |
| `h2` | **Section Title** | Major section dividers within a page. |
| `h3` | **Card/Modal Title** | Titles of contained UI elements or large modals. |
| `h4` | **Feature Highlight** | Marketing text or significant feature callouts. |
| `h5` | **Sub-section Header** | Grouping related content within a card or section. |
| `h6` | **Component Header** | Titles for dialogs, cards, or specific widgets. |
| `subtitle1` | **Emphasized Body** | Lead paragraphs, intro text, or list item titles. |
| `subtitle2` | **Label / Key** | **Table headers**, form labels, or metadata keys. Medium weight. |
| `body1` | **Primary Content** | The default for long-form reading, articles, and main descriptions. |
| `body2` | **Secondary Content** | **Image captions**, dense lists, table rows, help text, or UI labels where space is premium. |
| `button` | **Interactive Text** | Text inside buttons, tabs, and actionable chips. Often uppercase. |
| `caption` | **Metadata / Hints** | Timestamps, copyright footers, input field helpers, or avatar initials. Smallest legible text. |
| `overline` | **Eyebrow / Tag** | Uppercase labels above headings or tracking categories. |

## 2. Palette

### Intent Colors (Status)
| Token | Semantic Meaning | Usage |
|-------|------------------|-------|
| `primary` | **Action / Brand** | Main call-to-action buttons, active states, links, checkboxes, brand identity. |
| `secondary` | **Accent / Alternative** | Floating action buttons, selection controls, or distinct decorative elements. |
| `error` | **Critical / Destructive** | Form errors, delete buttons, "danger" zones, disconnected states. |
| `warning` | **Caution / Pending** | Alerts, non-blocking issues, "awaiting action" states. |
| `info` | **Neutral / Help** | Tips, help icons, informational toasts, "new feature" badges. |
| `success` | **Positive / Complete** | "Save successful" toasts, completion steps, valid form indicators. |

### Text Colors
| Token | Semantic Meaning | Usage |
|-------|------------------|-------|
| `text.primary` | **High Emphasis** | Headings, body text, active icons. The default "ink" color. |
| `text.secondary` | **Medium Emphasis** | Helper text, secondary labels, less important data fields. |
| `text.disabled` | **Low Emphasis** | Placeholder text, disabled inputs, inactive controls. |

### Backgrounds
| Token | Semantic Meaning | Usage |
|-------|------------------|-------|
| `background.default` | **App Canvas** | The lowest level background (behind everything). Usually off-white or dark grey. |
| `background.paper` | **Surface / Card** | Elevated surfaces like Cards, Drawers, Modals, Menus. Usually white or lighter grey. |

### Action States (Interactive)
| Token | Semantic Meaning | Usage |
|-------|------------------|-------|
| `action.active` | **Icon / Toggle** | Default color for icons and toggle buttons before interaction. |
| `action.hover` | **Mouseover** | Background tint for hover states (e.g., table rows, list items). |
| `action.selected` | **Current Selection** | Background tint for the currently selected item in a list or menu. |
| `action.disabled` | **Unusable (Content)** | Color of text/icons when disabled. |
| `action.disabledBackground` | **Unusable (Area)** | Background color of buttons/inputs when disabled. |
| `divider` | **Boundary** | Thin borders, horizontal rules, and separation lines. |

## 3. Layout & Shape

| Token | Semantic Meaning | Usage |
|-------|------------------|-------|
| `shape.borderRadius` | **Softness** | Global corner radius. Use `1x` for small inputs/chips, `2x` or `3x` for Cards/Dialogs to create a hierarchy of softness. |
| `spacing` | **Rhythm** | The fundamental grid unit (usually 8px). All padding/margin should be multiples of this (e.g., `theme.spacing(2)` = 16px). |

## 4. Elevation (Shadows)

| Token | Semantic Meaning | Usage |
|-------|------------------|-------|
| `shadows[0]` | **Flat** | Seamless integration with parent surface (e.g., Accordion). |
| `shadows[1]` | **Subtle Lift** | Buttons, Switch thumbs, low-priority cards. |
| `shadows[2-4]` | **Card Level** | Standard content cards, creating distinct grouping. |
| `shadows[8]` | **Dropdown/Menu** | Popovers, Select menus, Tooltips (floating above content). |
| `shadows[16]` | **Drawer/Nav** | Navigation drawers sliding over content. |
| `shadows[24]` | **Modal/Dialog** | Dialogs, Alerts (highest priority, blocking interaction). |

## 5. Z-Index (Layering)

| Token | Semantic Meaning | Usage |
|-------|------------------|-------|
| `mobileStepper` | **Inline Nav** | Bottom or inline steppers. |
| `fab` | **Floating Action** | Floating Action Button (FAB). |
| `speedDial` | **Expanded Action** | Speed dial actions. |
| `appBar` | **Global Header** | The top application bar (sticky). |
| `drawer` | **Side Navigation** | Drawers and sidebars. |
| `modal` | **Blocking Overlay** | Dialogs, Lightboxes. |
| `snackbar` | **Toast Notification** | Transient messages (bottom/top center). |
| `tooltip` | **Hover Hint** | Small informational popups (highest standard layer). |