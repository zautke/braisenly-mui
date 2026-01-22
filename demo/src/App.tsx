import React from 'react';
import { ThemeProviderWrapper, useThemeSwitcher, type ThemeName } from './ThemeContext';
import { Showcase } from './components/Showcase';
import { AppBar, Toolbar, Typography, Select, MenuItem, Box, FormControl, InputLabel } from '@mui/material';

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
        </Select>
      </FormControl>
    </Box>
  );
};

const Layout = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI 7 Migration Demo
          </Typography>
          <ThemeControls />
        </Toolbar>
      </AppBar>
      <Showcase />
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
