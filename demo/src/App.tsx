import React from 'react';
import { ThemeProviderWrapper, useThemeSwitcher, type ThemeName } from './ThemeContext';
import { Showcase } from './components/Showcase';
import { ThemeEditor } from './components/ThemeEditor';
import { useThemeEditor } from './ThemeEditorContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Palette as PaletteIcon } from '@mui/icons-material';

const EDITOR_WIDTH = 380;

const ThemeControls = () => {
  const { currentTheme, setTheme } = useThemeSwitcher();

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth size="small" variant="outlined" sx={{ m: 1 }}>
        <InputLabel id="theme-select-label" sx={{ color: 'white' }}>Theme</InputLabel>
        <Select
          labelId="theme-select-label"
          value={currentTheme}
          label="Theme"
          onChange={(e) => setTheme(e.target.value as ThemeName)}
          sx={{
            color: 'white',
            '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
            '& .MuiSvgIcon-root': { color: 'white' }
          }}
        >
          <MenuItem value="mui-default">MUI Default</MenuItem>
          <MenuItem value="base">Base Theme</MenuItem>
          <MenuItem value="glass">Glass (Dark)</MenuItem>
          <MenuItem value="corporate">Corporate (Light)</MenuItem>
          <MenuItem value="solarized">Solarized (Light)</MenuItem>
          <MenuItem value="terracotta">Terracotta (Light)</MenuItem>
          <MenuItem value="terracotta-dark">Terracotta (Dark)</MenuItem>
          <MenuItem value="neuromancer">Neuromancer (Dark)</MenuItem>
          <MenuItem value="cardboard">Cardboard (Light)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const Layout = () => {
  const { isOpen } = useThemeEditor();

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
      transition: 'margin-right 0.3s ease',
      marginRight: isOpen ? `${EDITOR_WIDTH}px` : 0,
    }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI 7 Theme Demo
          </Typography>
          <ThemeControls />
        </Toolbar>
      </AppBar>
      <Showcase />
      <ThemeEditor />
    </Box>
  );
}

function App() {
  return (
    <ThemeProviderWrapper>
      <Layout />
    </ThemeProviderWrapper>
  );
}

export default App;
