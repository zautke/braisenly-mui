/**
 * ThemeEditor - Live interactive theme customization sidebar
 * Full theme structure exposed: palette (light/main/dark), background (bk1-4), colorGuide, ext
 * Uses Victor Mono NFM for a code-editor aesthetic
 */
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Slider,
  Divider,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Button,
  Collapse,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  SpaceBar as SpaceBarIcon,
  RoundedCorner as RoundedIcon,
  RestartAlt as ResetIcon,
  ContentCopy as CopyIcon,
  ColorLens as ColorLensIcon,
  Extension as ExtensionIcon,
} from '@mui/icons-material';
import { useThemeEditor, type PaletteColorOverride } from '../ThemeEditorContext';
import { EditableText } from './EditableText';

const EDITOR_WIDTH = 380;

// Victor Mono NFM font family for code aesthetic
const editorFont = '"Victor Mono NFM", "Victor Mono", "Fira Code", "JetBrains Mono", monospace';
const smallFont = '0.65rem';

// Color swatch with inline editable hex value
interface ColorSwatchProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  indent?: boolean;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ label, value, onChange, indent = false }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, pl: indent ? 2 : 0 }}>
    <Box
      component="input"
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{
        width: 20,
        height: 20,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 0.5,
        cursor: 'pointer',
        p: 0,
        flexShrink: 0,
        '&::-webkit-color-swatch-wrapper': { p: 0 },
        '&::-webkit-color-swatch': { border: 'none', borderRadius: 2 },
      }}
    />
    <Typography
      variant="caption"
      sx={{ fontFamily: editorFont, fontSize: smallFont, flex: 1, color: 'text.secondary' }}
    >
      {label}
    </Typography>
    <EditableText
      value={value}
      onChange={onChange}
      sx={{ fontFamily: editorFont, fontSize: '0.6rem', color: 'text.disabled', textTransform: 'uppercase' }}
    />
  </Box>
);

// Collapsible palette color group (light/main/dark/contrastText)
interface PaletteColorGroupProps {
  name: string;
  color: PaletteColorOverride;
  onChange: (updates: Partial<PaletteColorOverride>) => void;
}

const PaletteColorGroup: React.FC<PaletteColorGroupProps> = ({ name, color, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ mb: 1 }}>
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          py: 0.5,
          '&:hover': { bgcolor: 'action.hover' },
          borderRadius: 0.5,
          px: 0.5,
        }}
      >
        <Box sx={{ width: 16, height: 16, bgcolor: color.main, borderRadius: 0.5, border: '1px solid', borderColor: 'divider' }} />
        <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, flex: 1, textTransform: 'capitalize' }}>
          {name}
        </Typography>
        {expanded ? <ExpandLessIcon sx={{ fontSize: 14 }} /> : <ExpandMoreIcon sx={{ fontSize: 14 }} />}
      </Box>
      <Collapse in={expanded}>
        <Box sx={{ pl: 1, borderLeft: '2px solid', borderColor: 'divider', ml: 1, mt: 0.5 }}>
          <ColorSwatch label="light" value={color.light} onChange={(c) => onChange({ light: c })} />
          <ColorSwatch label="main" value={color.main} onChange={(c) => onChange({ main: c })} />
          <ColorSwatch label="dark" value={color.dark} onChange={(c) => onChange({ dark: c })} />
          <ColorSwatch label="contrastText" value={color.contrastText} onChange={(c) => onChange({ contrastText: c })} />
        </Box>
      </Collapse>
    </Box>
  );
};

// Slider control for numeric values
interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

const SliderControl: React.FC<SliderControlProps> = ({ label, value, min, max, step = 1, unit = '', onChange }) => (
  <Box sx={{ mb: 1.5 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.25 }}>
      <Typography variant="caption" sx={{ fontFamily: editorFont, fontSize: smallFont, color: 'text.secondary' }}>
        {label}
      </Typography>
      <Typography variant="caption" sx={{ fontFamily: editorFont, fontSize: smallFont, color: 'primary.main', fontWeight: 600 }}>
        {value}{unit}
      </Typography>
    </Box>
    <Slider
      size="small"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(_, v) => onChange(v as number)}
      sx={{ py: 0.25 }}
    />
  </Box>
);

// ColorGuide section with virtualized-like display (shows first N, expandable)
interface ColorGuideProps {
  colors: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

const ColorGuideSection: React.FC<ColorGuideProps> = ({ colors, onChange }) => {
  const [showAll, setShowAll] = useState(false);
  const entries = Object.entries(colors);
  const displayCount = showAll ? entries.length : 10;
  const displayedEntries = entries.slice(0, displayCount);

  return (
    <Box>
      {displayedEntries.map(([key, value]) => (
        <ColorSwatch key={key} label={key} value={value} onChange={(c) => onChange(key, c)} />
      ))}
      {entries.length > 10 && (
        <Button
          size="small"
          variant="text"
          onClick={() => setShowAll(!showAll)}
          sx={{ fontFamily: editorFont, fontSize: '0.6rem', mt: 0.5, textTransform: 'none' }}
        >
          {showAll ? `Show less` : `Show all ${entries.length} colors...`}
        </Button>
      )}
    </Box>
  );
};

export const ThemeEditor: React.FC = () => {
  const { isOpen, setIsOpen, overrides, updateOverrides, resetOverrides, exportTheme } = useThemeEditor();
  const [activeTab, setActiveTab] = useState(0);

  const handleCopyTheme = () => {
    const themeCode = exportTheme();
    navigator.clipboard.writeText(themeCode);
  };

  // Helper to update nested palette color
  const updatePaletteColor = (colorName: string) => (updates: Partial<PaletteColorOverride>) => {
    updateOverrides({ [colorName]: { ...(overrides as any)[colorName], ...updates } } as any);
  };

  // Helper to update colorGuide entry
  const updateColorGuide = (key: string, value: string) => {
    updateOverrides({ colorGuide: { ...overrides.colorGuide, [key]: value } });
  };

  return (
    <>
      {/* Toggle Button - Fixed on right edge */}
      <Tooltip title={isOpen ? 'Close Theme Editor' : 'Open Theme Editor'} placement="left">
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: 'fixed',
            right: isOpen ? EDITOR_WIDTH : 0,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: '8px 0 0 8px',
            width: 32,
            height: 64,
            transition: 'right 0.3s ease',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Tooltip>

      {/* Editor Drawer */}
      <Drawer
        anchor="right"
        open={isOpen}
        variant="persistent"
        sx={{
          width: isOpen ? EDITOR_WIDTH : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: EDITOR_WIDTH,
            boxSizing: 'border-box',
            borderLeft: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          },
        }}
      >
        {/* Header with Title and Tabs */}
        <Box sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ px: 1.5, pt: 1.5, pb: 0.5 }}>
            <Typography variant="subtitle1" sx={{ fontFamily: editorFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PaletteIcon fontSize="small" />
              Theme Editor
            </Typography>
          </Box>
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant="fullWidth"
            sx={{
              minHeight: 32,
              '& .MuiTab-root': {
                fontFamily: editorFont,
                fontSize: '0.7rem',
                fontWeight: 500,
                minHeight: 32,
                py: 0.5,
                textTransform: 'none',
              },
            }}
          >
            <Tab label="Quick" />
            <Tab label="Full Theme" />
          </Tabs>
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 0 }}>
          {/* === QUICK TAB (Tab 0) - Simplified color swatches === */}
          {activeTab === 0 && (
            <Box>
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="overline" sx={{ fontFamily: editorFont, color: 'text.disabled', fontSize: '0.6rem' }}>
                  Primary Colors
                </Typography>
                <ColorSwatch label="Primary" value={overrides.primary.main} onChange={(c) => updateOverrides({ primary: { ...overrides.primary, main: c } })} />
                <ColorSwatch label="Secondary" value={overrides.secondary.main} onChange={(c) => updateOverrides({ secondary: { ...overrides.secondary, main: c } })} />

                <Typography variant="overline" sx={{ fontFamily: editorFont, color: 'text.disabled', fontSize: '0.6rem', mt: 1.5, display: 'block' }}>
                  Semantic Colors
                </Typography>
                <ColorSwatch label="Success" value={overrides.success.main} onChange={(c) => updateOverrides({ success: { ...overrides.success, main: c } })} />
                <ColorSwatch label="Warning" value={overrides.warning.main} onChange={(c) => updateOverrides({ warning: { ...overrides.warning, main: c } })} />
                <ColorSwatch label="Error" value={overrides.error.main} onChange={(c) => updateOverrides({ error: { ...overrides.error, main: c } })} />
                <ColorSwatch label="Info" value={overrides.info.main} onChange={(c) => updateOverrides({ info: { ...overrides.info, main: c } })} />

                <Typography variant="overline" sx={{ fontFamily: editorFont, color: 'text.disabled', fontSize: '0.6rem', mt: 1.5, display: 'block' }}>
                  Background
                </Typography>
                <ColorSwatch label="Default BG" value={overrides.background.default} onChange={(c) => updateOverrides({ background: { ...overrides.background, default: c } })} />
                <ColorSwatch label="Paper BG" value={overrides.background.paper} onChange={(c) => updateOverrides({ background: { ...overrides.background, paper: c } })} />

                <Typography variant="overline" sx={{ fontFamily: editorFont, color: 'text.disabled', fontSize: '0.6rem', mt: 1.5, display: 'block' }}>
                  Text
                </Typography>
                <ColorSwatch label="Primary Text" value={overrides.text.primary} onChange={(c) => updateOverrides({ text: { ...overrides.text, primary: c } })} />
                <ColorSwatch label="Secondary Text" value={overrides.text.secondary} onChange={(c) => updateOverrides({ text: { ...overrides.text, secondary: c } })} />
              </Box>

              <Divider />

              {/* Shape */}
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="overline" sx={{ fontFamily: editorFont, color: 'text.disabled', fontSize: '0.6rem' }}>
                  Shape
                </Typography>
                <SliderControl label="Border Radius" value={overrides.borderRadius} min={0} max={24} unit="px" onChange={(v) => updateOverrides({ borderRadius: v })} />
              </Box>

              <Divider />

              {/* Spacing */}
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="overline" sx={{ fontFamily: editorFont, color: 'text.disabled', fontSize: '0.6rem' }}>
                  Spacing
                </Typography>
                <SliderControl label="Base Unit" value={overrides.spacingUnit} min={4} max={16} unit="px" onChange={(v) => updateOverrides({ spacingUnit: v })} />
              </Box>

              <Divider />

              {/* Typography */}
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="overline" sx={{ fontFamily: editorFont, color: 'text.disabled', fontSize: '0.6rem' }}>
                  Typography
                </Typography>
                <SliderControl label="Font Size" value={overrides.fontSize} min={12} max={18} unit="px" onChange={(v) => updateOverrides({ fontSize: v })} />
                <SliderControl label="Font Weight" value={overrides.fontWeightRegular} min={300} max={600} step={100} onChange={(v) => updateOverrides({ fontWeightRegular: v })} />
              </Box>
            </Box>
          )}

          {/* === FULL THEME TAB (Tab 1) - Expanded structure === */}
          {activeTab === 1 && (
            <Box>
              {/* Palette Colors Section */}
              <Accordion defaultExpanded disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PaletteIcon sx={{ fontSize: 16 }} /> Palette Colors
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0 }}>
                  <PaletteColorGroup name="primary" color={overrides.primary} onChange={updatePaletteColor('primary')} />
                  <PaletteColorGroup name="secondary" color={overrides.secondary} onChange={updatePaletteColor('secondary')} />
                  <PaletteColorGroup name="success" color={overrides.success} onChange={updatePaletteColor('success')} />
                  <PaletteColorGroup name="warning" color={overrides.warning} onChange={updatePaletteColor('warning')} />
                  <PaletteColorGroup name="error" color={overrides.error} onChange={updatePaletteColor('error')} />
                  <PaletteColorGroup name="info" color={overrides.info} onChange={updatePaletteColor('info')} />
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* Background Section (with bk1-bk4) */}
              <Accordion disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PaletteIcon sx={{ fontSize: 16 }} /> Background
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0 }}>
                  <ColorSwatch label="default" value={overrides.background.default} onChange={(c) => updateOverrides({ background: { ...overrides.background, default: c } })} />
                  <ColorSwatch label="paper" value={overrides.background.paper} onChange={(c) => updateOverrides({ background: { ...overrides.background, paper: c } })} />
                  <Typography variant="overline" sx={{ fontFamily: editorFont, fontSize: '0.55rem', color: 'text.disabled', mt: 1, display: 'block' }}>
                    Augmented (bk1-bk4)
                  </Typography>
                  <ColorSwatch label="bk1" value={overrides.background.bk1 || '#f0f0f0'} onChange={(c) => updateOverrides({ background: { ...overrides.background, bk1: c } })} />
                  <ColorSwatch label="bk2" value={overrides.background.bk2 || '#e0e0e0'} onChange={(c) => updateOverrides({ background: { ...overrides.background, bk2: c } })} />
                  <ColorSwatch label="bk3" value={overrides.background.bk3 || '#d0d0d0'} onChange={(c) => updateOverrides({ background: { ...overrides.background, bk3: c } })} />
                  <ColorSwatch label="bk4" value={overrides.background.bk4 || '#c0c0c0'} onChange={(c) => updateOverrides({ background: { ...overrides.background, bk4: c } })} />
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* Text Section */}
              <Accordion disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextFieldsIcon sx={{ fontSize: 16 }} /> Text
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0 }}>
                  <ColorSwatch label="primary" value={overrides.text.primary} onChange={(c) => updateOverrides({ text: { ...overrides.text, primary: c } })} />
                  <ColorSwatch label="secondary" value={overrides.text.secondary} onChange={(c) => updateOverrides({ text: { ...overrides.text, secondary: c } })} />
                  {overrides.text.disabled && (
                    <ColorSwatch label="disabled" value={overrides.text.disabled} onChange={(c) => updateOverrides({ text: { ...overrides.text, disabled: c } })} />
                  )}
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* ColorGuide Section */}
              <Accordion disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ColorLensIcon sx={{ fontSize: 16 }} /> ColorGuide
                    <Typography component="span" sx={{ fontFamily: editorFont, fontSize: '0.55rem', color: 'text.disabled', ml: 0.5 }}>
                      ({Object.keys(overrides.colorGuide).length})
                    </Typography>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0 }}>
                  {Object.keys(overrides.colorGuide).length > 0 ? (
                    <ColorGuideSection colors={overrides.colorGuide} onChange={updateColorGuide} />
                  ) : (
                    <Typography sx={{ fontFamily: editorFont, fontSize: '0.6rem', color: 'text.disabled', fontStyle: 'italic' }}>
                      No colorGuide defined in theme
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* ext Section */}
              <Accordion disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ExtensionIcon sx={{ fontSize: 16 }} /> ext (custom)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0 }}>
                  {Object.keys(overrides.ext || {}).length > 0 ? (
                    <Box component="pre" sx={{ fontFamily: editorFont, fontSize: '0.55rem', color: 'text.secondary', m: 0, overflow: 'auto' }}>
                      {JSON.stringify(overrides.ext, null, 2)}
                    </Box>
                  ) : (
                    <Typography sx={{ fontFamily: editorFont, fontSize: '0.6rem', color: 'text.disabled', fontStyle: 'italic' }}>
                      No ext properties defined
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* Shape Section */}
              <Accordion disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RoundedIcon sx={{ fontSize: 16 }} /> Shape
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0 }}>
                  <SliderControl label="borderRadius" value={overrides.borderRadius} min={0} max={24} unit="px" onChange={(v) => updateOverrides({ borderRadius: v })} />
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* Spacing Section */}
              <Accordion disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SpaceBarIcon sx={{ fontSize: 16 }} /> Spacing
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0 }}>
                  <SliderControl label="unit" value={overrides.spacingUnit} min={4} max={16} unit="px" onChange={(v) => updateOverrides({ spacingUnit: v })} />
                </AccordionDetails>
              </Accordion>

              <Divider />

              {/* Typography Section */}
              <Accordion disableGutters elevation={0} sx={{ '&::before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2, minHeight: 40, '& .MuiAccordionSummary-content': { my: 1 } }}>
                  <Typography sx={{ fontFamily: editorFont, fontSize: smallFont, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextFieldsIcon sx={{ fontSize: 16 }} /> Typography
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2, pt: 0 }}>
                  <SliderControl label="fontSize" value={overrides.fontSize} min={12} max={18} unit="px" onChange={(v) => updateOverrides({ fontSize: v })} />
                  <SliderControl label="fontWeightRegular" value={overrides.fontWeightRegular} min={300} max={600} step={100} onChange={(v) => updateOverrides({ fontWeightRegular: v })} />
                </AccordionDetails>
              </Accordion>
            </Box>
          )}
        </Box>

        {/* Footer Actions */}
        <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" startIcon={<ResetIcon />} onClick={resetOverrides} sx={{ flex: 1, fontFamily: editorFont, fontSize: '0.65rem' }}>
              Reset
            </Button>
            <Button size="small" variant="contained" startIcon={<CopyIcon />} onClick={handleCopyTheme} sx={{ flex: 1, fontFamily: editorFont, fontSize: '0.65rem' }}>
              Copy
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

