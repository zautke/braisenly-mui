import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Pagination,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Skeleton,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Switch,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  Navigation as NavigationIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

// Category definitions for sidebar navigation
const categories = [
  { id: 'inputs-selection', label: 'Inputs & Selection' },
  { id: 'buttons-actions', label: 'Buttons & Actions' },
  { id: 'navigation', label: 'Navigation' },
  { id: 'data-display', label: 'Data Display' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'surfaces-containers', label: 'Surfaces & Containers' },
  { id: 'overlays', label: 'Overlays' },
];

// Category Section component with visual distinction
const CategorySection: React.FC<{
  id: string;
  title: string;
  children: React.ReactNode;
}> = ({ id, title, children }) => (
  <Box id={id} sx={{ scrollMarginTop: 24 }}>
    <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, pb: 1, borderBottom: 1, borderColor: 'divider' }}>
        {title}
      </Typography>
      {children}
    </Paper>
  </Box>
);

// Subsection component for organizing within categories
const SubSection: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" component="h3" gutterBottom>
      {title}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {subtitle}
      </Typography>
    )}
    {children}
  </Box>
);

const sliderMarks = [
  { value: 0, label: '0' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

const tableRows = [
  { name: 'Alpha', calories: 120, fat: 6.0, carbs: 24, protein: 4.0 },
  { name: 'Beta', calories: 98, fat: 4.0, carbs: 19, protein: 3.2 },
  { name: 'Gamma', calories: 86, fat: 2.0, carbs: 15, protein: 2.7 },
];

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export const Showcase: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState('alpha');
  const [activeStep, setActiveStep] = React.useState(1);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          {/* Header */}
          <Box>
            <Typography variant="h4" gutterBottom>
              Component Showcase
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Theme overrides in action across the MUI component library.
            </Typography>
          </Box>

          {/* Category Navigation Index */}
          <Paper sx={{ p: 2, position: 'sticky', top: 0, zIndex: 10 }} elevation={3}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
              Jump to category:
            </Typography>
            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.label}
                  onClick={() => scrollToSection(category.id)}
                  clickable
                  variant="outlined"
                  size="small"
                />
              ))}
            </Stack>
          </Paper>

          {/* ============================================ */}
          {/* INPUTS & SELECTION */}
          {/* ============================================ */}
          <CategorySection id="inputs-selection" title="Inputs & Selection">
            <Grid container spacing={3}>
              {/* TextField Variants */}
              <Grid item xs={12} md={6}>
                <SubSection title="TextField Variants">
                  <Stack spacing={2}>
                    <TextField label="Outlined" variant="outlined" fullWidth />
                    <TextField label="Filled" variant="filled" fullWidth />
                    <TextField label="Standard" variant="standard" fullWidth />
                    <TextField label="With Helper Text" helperText="Some important helper text" fullWidth />
                    <TextField label="Error State" error helperText="Error message" fullWidth />
                    <TextField label="Disabled" disabled fullWidth />
                  </Stack>
                </SubSection>
              </Grid>

              {/* Select */}
              <Grid item xs={12} md={6}>
                <SubSection title="Select">
                  <Stack spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="select-label">Status</InputLabel>
                      <Select
                        labelId="select-label"
                        label="Status"
                        value={selectValue}
                        onChange={handleSelectChange}
                      >
                        <MenuItem value="alpha">Alpha</MenuItem>
                        <MenuItem value="beta">Beta</MenuItem>
                        <MenuItem value="gamma">Gamma</MenuItem>
                      </Select>
                    </FormControl>
                    <Autocomplete
                      options={['Phoenix', 'Oslo', 'Tokyo', 'Lisbon', 'Sydney', 'Berlin']}
                      renderInput={(params) => <TextField {...params} label="Autocomplete" />}
                    />
                  </Stack>
                </SubSection>
              </Grid>

              {/* Checkbox, Radio, Switch */}
              <Grid item xs={12} md={6}>
                <SubSection title="Checkbox, Radio & Switch">
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Checked Checkbox" />
                    <FormControlLabel control={<Checkbox />} label="Unchecked Checkbox" />
                    <FormControlLabel control={<Checkbox indeterminate />} label="Indeterminate" />
                    <FormControlLabel control={<Checkbox disabled />} label="Disabled" />
                  </FormGroup>
                  <Divider sx={{ my: 2 }} />
                  <RadioGroup defaultValue="a">
                    <FormControlLabel value="a" control={<Radio />} label="Radio Option A" />
                    <FormControlLabel value="b" control={<Radio />} label="Radio Option B" />
                    <FormControlLabel value="c" control={<Radio disabled />} label="Disabled Option" />
                  </RadioGroup>
                  <Divider sx={{ my: 2 }} />
                  <FormGroup row>
                    <FormControlLabel control={<Switch defaultChecked />} label="On" />
                    <FormControlLabel control={<Switch />} label="Off" />
                    <FormControlLabel control={<Switch disabled />} label="Disabled" />
                  </FormGroup>
                </SubSection>
              </Grid>

              {/* Slider */}
              <Grid item xs={12} md={6}>
                <SubSection title="Slider">
                  <Stack spacing={4} sx={{ px: 1 }}>
                    <Box>
                      <Typography variant="body2" gutterBottom>Default Slider</Typography>
                      <Slider defaultValue={30} />
                    </Box>
                    <Box>
                      <Typography variant="body2" gutterBottom>With Marks</Typography>
                      <Slider defaultValue={60} marks={sliderMarks} />
                    </Box>
                    <Box>
                      <Typography variant="body2" gutterBottom>Range Slider</Typography>
                      <Slider defaultValue={[20, 60]} />
                    </Box>
                    <Box>
                      <Typography variant="body2" gutterBottom>Disabled</Typography>
                      <Slider defaultValue={50} disabled />
                    </Box>
                  </Stack>
                </SubSection>
              </Grid>
            </Grid>
          </CategorySection>

          {/* ============================================ */}
          {/* BUTTONS & ACTIONS */}
          {/* ============================================ */}
          <CategorySection id="buttons-actions" title="Buttons & Actions">
            <Grid container spacing={3}>
              {/* Button Variants */}
              <Grid item xs={12} md={6}>
                <SubSection title="Button Variants">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Button variant="contained">Contained</Button>
                      <Button variant="outlined">Outlined</Button>
                      <Button variant="text">Text</Button>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Button variant="contained" color="secondary">Secondary</Button>
                      <Button variant="contained" color="success">Success</Button>
                      <Button variant="contained" color="error">Error</Button>
                      <Button variant="contained" color="warning">Warning</Button>
                      <Button variant="contained" color="info">Info</Button>
                    </Stack>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Button Sizes */}
              <Grid item xs={12} md={6}>
                <SubSection title="Button Sizes">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Button variant="contained" size="small">Small</Button>
                      <Button variant="contained" size="medium">Medium</Button>
                      <Button variant="contained" size="large">Large</Button>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Button variant="outlined" size="small">Small</Button>
                      <Button variant="outlined" size="medium">Medium</Button>
                      <Button variant="outlined" size="large">Large</Button>
                    </Stack>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Buttons with Icons & States */}
              <Grid item xs={12} md={6}>
                <SubSection title="Buttons with Icons & States">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Button variant="contained" startIcon={<AddIcon />}>Create</Button>
                      <Button variant="outlined" endIcon={<ShareIcon />}>Share</Button>
                      <Button variant="contained" startIcon={<DeleteIcon />} color="error">Delete</Button>
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Button variant="contained" disabled>Disabled</Button>
                      <Button variant="outlined" disabled>Disabled</Button>
                    </Stack>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Chips */}
              <Grid item xs={12} md={6}>
                <SubSection title="Chips">
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Chip label="Default" />
                      <Chip label="Clickable" onClick={() => {}} />
                      <Chip label="Deletable" onDelete={() => {}} />
                      <Chip icon={<FavoriteIcon />} label="With Icon" />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Chip label="Primary" color="primary" />
                      <Chip label="Secondary" color="secondary" />
                      <Chip label="Success" color="success" />
                      <Chip label="Error" color="error" />
                      <Chip label="Warning" color="warning" />
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                      <Chip label="Outlined" variant="outlined" />
                      <Chip label="Outlined Primary" variant="outlined" color="primary" />
                    </Stack>
                  </Stack>
                </SubSection>
              </Grid>

              {/* IconButton & FAB */}
              <Grid item xs={12} md={6}>
                <SubSection title="IconButton">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton aria-label="settings"><SettingsIcon /></IconButton>
                    <IconButton color="primary" aria-label="add"><AddIcon /></IconButton>
                    <IconButton color="secondary" aria-label="favorite"><FavoriteIcon /></IconButton>
                    <IconButton color="error" aria-label="delete"><DeleteIcon /></IconButton>
                    <IconButton disabled aria-label="edit"><EditIcon /></IconButton>
                  </Stack>
                </SubSection>
              </Grid>

              {/* FAB */}
              <Grid item xs={12} md={6}>
                <SubSection title="Floating Action Button (FAB)">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Fab color="primary" aria-label="add" size="small">
                      <AddIcon />
                    </Fab>
                    <Fab color="secondary" aria-label="edit" size="medium">
                      <EditIcon />
                    </Fab>
                    <Fab color="primary" aria-label="navigate" size="large">
                      <NavigationIcon />
                    </Fab>
                    <Fab variant="extended" color="primary">
                      <NavigationIcon sx={{ mr: 1 }} />
                      Navigate
                    </Fab>
                  </Stack>
                </SubSection>
              </Grid>
            </Grid>
          </CategorySection>

          {/* ============================================ */}
          {/* NAVIGATION */}
          {/* ============================================ */}
          <CategorySection id="navigation" title="Navigation">
            <Grid container spacing={3}>
              {/* Tabs */}
              <Grid item xs={12} md={6}>
                <SubSection title="Tabs">
                  <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
                    <Tab label="Overview" />
                    <Tab label="Details" />
                    <Tab label="Settings" />
                  </Tabs>
                  <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1, mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Tab panel content for: {['Overview', 'Details', 'Settings'][tabValue]}
                    </Typography>
                  </Box>
                </SubSection>
              </Grid>

              {/* Breadcrumbs */}
              <Grid item xs={12} md={6}>
                <SubSection title="Breadcrumbs">
                  <Stack spacing={2}>
                    <Breadcrumbs aria-label="breadcrumb">
                      <Link underline="hover" color="inherit" href="#">
                        Home
                      </Link>
                      <Link underline="hover" color="inherit" href="#">
                        Library
                      </Link>
                      <Typography color="text.primary">Data</Typography>
                    </Breadcrumbs>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                      <Link underline="hover" color="inherit" href="#">
                        MUI
                      </Link>
                      <Link underline="hover" color="inherit" href="#">
                        Components
                      </Link>
                      <Typography color="text.primary">Breadcrumbs</Typography>
                    </Breadcrumbs>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Pagination */}
              <Grid item xs={12} md={6}>
                <SubSection title="Pagination">
                  <Stack spacing={2}>
                    <Pagination count={10} color="primary" />
                    <Pagination count={10} variant="outlined" color="primary" />
                    <Pagination count={10} shape="rounded" />
                    <Pagination count={10} size="small" showFirstButton showLastButton />
                  </Stack>
                </SubSection>
              </Grid>

              {/* Stepper */}
              <Grid item xs={12} md={6}>
                <SubSection title="Stepper">
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1))}
                    >
                      Next
                    </Button>
                  </Stack>
                </SubSection>
              </Grid>
            </Grid>
          </CategorySection>

          {/* ============================================ */}
          {/* DATA DISPLAY */}
          {/* ============================================ */}
          <CategorySection id="data-display" title="Data Display">
            <Grid container spacing={3}>
              {/* Table */}
              <Grid item xs={12}>
                <SubSection title="Table">
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Item</TableCell>
                          <TableCell align="right">Calories</TableCell>
                          <TableCell align="right">Fat (g)</TableCell>
                          <TableCell align="right">Carbs (g)</TableCell>
                          <TableCell align="right">Protein (g)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableRows.map((row) => (
                          <TableRow key={row.name} hover>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </SubSection>
              </Grid>

              {/* List */}
              <Grid item xs={12} md={6}>
                <SubSection title="List">
                  <Paper variant="outlined">
                    <List>
                      <ListItem>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" secondary="Overview" />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary="Profile" secondary="Account settings" />
                      </ListItem>
                      <Divider component="li" />
                      <ListItem>
                        <ListItemIcon><SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Preferences" secondary="Theme & layout" />
                      </ListItem>
                    </List>
                  </Paper>
                </SubSection>
              </Grid>

              {/* Avatar & Badge */}
              <Grid item xs={12} md={6}>
                <SubSection title="Avatar & Badge">
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Avatar Group</Typography>
                      <AvatarGroup max={4}>
                        <Avatar>AL</Avatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>BT</Avatar>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>GM</Avatar>
                        <Avatar sx={{ bgcolor: 'error.main' }}>DL</Avatar>
                        <Avatar>EP</Avatar>
                      </AvatarGroup>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Badges</Typography>
                      <Stack direction="row" spacing={4} alignItems="center">
                        <Badge badgeContent={4} color="primary">
                          <MailIcon />
                        </Badge>
                        <Badge badgeContent={99} color="secondary">
                          <MailIcon />
                        </Badge>
                        <Badge variant="dot" color="error">
                          <FavoriteIcon />
                        </Badge>
                        <Badge badgeContent={0} showZero color="primary">
                          <MailIcon />
                        </Badge>
                      </Stack>
                    </Box>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Tooltip */}
              <Grid item xs={12}>
                <SubSection title="Tooltip">
                  <Stack direction="row" spacing={3} alignItems="center" sx={{ flexWrap: 'wrap', gap: 2 }}>
                    <Tooltip title="Default tooltip">
                      <Button variant="outlined">Hover me</Button>
                    </Tooltip>
                    <Tooltip title="Tooltip with arrow" arrow>
                      <Button variant="outlined">With arrow</Button>
                    </Tooltip>
                    <Tooltip title="Top placement" placement="top" arrow>
                      <Button variant="outlined">Top</Button>
                    </Tooltip>
                    <Tooltip title="Right placement" placement="right" arrow>
                      <Button variant="outlined">Right</Button>
                    </Tooltip>
                  </Stack>
                </SubSection>
              </Grid>
            </Grid>
          </CategorySection>

          {/* ============================================ */}
          {/* FEEDBACK */}
          {/* ============================================ */}
          <CategorySection id="feedback" title="Feedback">
            <Grid container spacing={3}>
              {/* Alert Severities */}
              <Grid item xs={12} md={6}>
                <SubSection title="Alert Severities">
                  <Stack spacing={2}>
                    <Alert severity="success" icon={<CheckCircleIcon />}>
                      Success — Operation completed successfully!
                    </Alert>
                    <Alert severity="info" icon={<InfoIcon />}>
                      Info — Here is some helpful information.
                    </Alert>
                    <Alert severity="warning" icon={<WarningIcon />}>
                      Warning — Please review before proceeding.
                    </Alert>
                    <Alert severity="error">
                      Error — Something went wrong.
                    </Alert>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Alert Variants */}
              <Grid item xs={12} md={6}>
                <SubSection title="Alert Variants">
                  <Stack spacing={2}>
                    <Alert severity="success" variant="outlined">
                      Outlined success alert
                    </Alert>
                    <Alert severity="info" variant="filled">
                      Filled info alert
                    </Alert>
                    <Alert severity="warning" variant="standard">
                      Standard warning alert
                    </Alert>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Snackbar */}
              <Grid item xs={12} md={6}>
                <SubSection title="Snackbar">
                  <Button variant="outlined" onClick={() => setSnackbarOpen(true)}>
                    Show Snackbar
                  </Button>
                </SubSection>
              </Grid>

              {/* Progress */}
              <Grid item xs={12} md={6}>
                <SubSection title="Progress">
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Linear Progress</Typography>
                      <LinearProgress />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Linear Determinate</Typography>
                      <LinearProgress variant="determinate" value={65} />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Circular Progress</Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <CircularProgress size={24} />
                        <CircularProgress size={32} color="secondary" />
                        <CircularProgress size={40} variant="determinate" value={75} />
                      </Stack>
                    </Box>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Skeleton */}
              <Grid item xs={12} md={6}>
                <SubSection title="Skeleton">
                  <Stack spacing={1}>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" height={80} />
                    <Skeleton variant="rounded" height={60} />
                  </Stack>
                </SubSection>
              </Grid>

              {/* Dialog */}
              <Grid item xs={12} md={6}>
                <SubSection title="Dialog">
                  <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                    Open Dialog
                  </Button>
                </SubSection>
              </Grid>
            </Grid>
          </CategorySection>

          {/* ============================================ */}
          {/* SURFACES & CONTAINERS */}
          {/* ============================================ */}
          <CategorySection id="surfaces-containers" title="Surfaces & Containers">
            <Grid container spacing={3}>
              {/* Card */}
              <Grid item xs={12} md={6}>
                <SubSection title="Card">
                  <Card variant="outlined">
                    <CardHeader
                      avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>R</Avatar>}
                      title="Card Title"
                      subheader="Card subtitle"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        This card highlights elevation, spacing, and typography overrides.
                        Cards are surfaces that display content and actions on a single topic.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" startIcon={<ShareIcon />}>Share</Button>
                      <Button size="small" variant="contained" startIcon={<AddIcon />}>Action</Button>
                    </CardActions>
                  </Card>
                </SubSection>
              </Grid>

              {/* Paper */}
              <Grid item xs={12} md={6}>
                <SubSection title="Paper">
                  <Stack spacing={2}>
                    <Paper elevation={0} sx={{ p: 2 }}>
                      <Typography variant="body2">Elevation 0</Typography>
                    </Paper>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="body2">Elevation 1</Typography>
                    </Paper>
                    <Paper elevation={3} sx={{ p: 2 }}>
                      <Typography variant="body2">Elevation 3</Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="body2">Outlined variant</Typography>
                    </Paper>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Accordion */}
              <Grid item xs={12}>
                <SubSection title="Accordion">
                  <Stack spacing={1}>
                    <Accordion defaultExpanded>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Accordion One (Expanded by default)</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          This accordion is expanded by default to show the content area styling.
                          Accordions allow users to toggle sections of content.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Accordion Two</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2">
                          Additional details inside the second panel. Click to expand/collapse.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion disabled>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Disabled Accordion</Typography>
                      </AccordionSummary>
                    </Accordion>
                  </Stack>
                </SubSection>
              </Grid>

              {/* Toolbar */}
              <Grid item xs={12}>
                <SubSection title="Toolbar">
                  <Paper variant="outlined">
                    <Toolbar>
                      <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Toolbar Title
                      </Typography>
                      <IconButton color="inherit" aria-label="settings">
                        <SettingsIcon />
                      </IconButton>
                    </Toolbar>
                  </Paper>
                </SubSection>
              </Grid>
            </Grid>
          </CategorySection>

          {/* ============================================ */}
          {/* OVERLAYS */}
          {/* ============================================ */}
          <CategorySection id="overlays" title="Overlays">
            <Grid container spacing={3}>
              {/* Drawer */}
              <Grid item xs={12} md={4}>
                <SubSection title="Drawer">
                  <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
                    Open Drawer
                  </Button>
                </SubSection>
              </Grid>

              {/* Menu */}
              <Grid item xs={12} md={4}>
                <SubSection title="Menu">
                  <Button
                    variant="outlined"
                    startIcon={<MenuIcon />}
                    onClick={(event) => setMenuAnchorEl(event.currentTarget)}
                  >
                    Open Menu
                  </Button>
                </SubSection>
              </Grid>

              {/* Popover */}
              <Grid item xs={12} md={4}>
                <SubSection title="Popover">
                  <Button
                    variant="outlined"
                    startIcon={<InfoIcon />}
                    onClick={(event) => setPopoverAnchorEl(event.currentTarget)}
                  >
                    Open Popover
                  </Button>
                </SubSection>
              </Grid>
            </Grid>
          </CategorySection>
        </Stack>
      </Container>

      {/* ============================================ */}
      {/* OVERLAY COMPONENTS (rendered at root level) */}
      {/* ============================================ */}

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mt: 1 }}>
            This dialog demonstrates the modal overlay styling including backdrop,
            paper elevation, and action button layout. Dialogs are used for important
            information that requires user attention or action.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 2 }} role="presentation">
          <Typography variant="h6" gutterBottom>
            Drawer Panel
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Drawers provide access to destinations and app functionality.
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
          <Box sx={{ mt: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => setDrawerOpen(false)}>
              Close
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem onClick={() => setMenuAnchorEl(null)}>
          <ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => setMenuAnchorEl(null)} selected>
          <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
          My Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setMenuAnchorEl(null)}>
          Logout
        </MenuItem>
      </Menu>

      {/* Popover */}
      <Popover
        anchorEl={popoverAnchorEl}
        open={Boolean(popoverAnchorEl)}
        onClose={() => setPopoverAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: 280 }}>
          <Typography variant="subtitle1" gutterBottom>
            Popover Content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Popovers display rich content in a portal. They can be used for
            contextual information, quick actions, or additional details.
          </Typography>
        </Box>
      </Popover>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          Action completed successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};
