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
  ExpandMore as ExpandMoreIcon,
  Favorite as FavoriteIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

const Section: React.FC<{
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}> = ({ title, subtitle, children }) => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Stack spacing={2}>
      <Box>
        <Typography variant="h6">{title}</Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Box>
      {children}
    </Stack>
  </Paper>
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

  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Component Showcase
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Theme overrides in action across the MUI component library.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Section title="Buttons & Chips">
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                  <Button variant="contained">Contained</Button>
                  <Button variant="outlined">Outlined</Button>
                  <Button variant="text">Text</Button>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    Create
                  </Button>
                  <Button variant="contained" disabled>
                    Disabled
                  </Button>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                  <Chip label="Default" />
                  <Chip label="Clickable" onClick={() => {}} />
                  <Chip label="Deletable" onDelete={() => {}} />
                  <Chip icon={<FavoriteIcon />} label="Icon" />
                </Stack>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Alerts & Snackbar">
                <Stack spacing={2}>
                  <Alert icon={<CheckCircleIcon />} severity="success">
                    Success alert with icon override.
                  </Alert>
                  <Alert icon={<InfoIcon />} severity="info" variant="outlined">
                    Outlined info alert.
                  </Alert>
                  <Button variant="outlined" onClick={() => setSnackbarOpen(true)}>
                    Show Snackbar
                  </Button>
                </Stack>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Inputs & Select">
                <Stack spacing={2}>
                  <TextField label="Outlined" variant="outlined" />
                  <TextField label="Filled" variant="filled" />
                  <TextField label="Standard" variant="standard" />
                  <FormControl>
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
                </Stack>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Selection Controls">
                <FormGroup row sx={{ gap: 2 }}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
                  <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
                </FormGroup>
                <RadioGroup row defaultValue="a">
                  <FormControlLabel value="a" control={<Radio />} label="Radio A" />
                  <FormControlLabel value="b" control={<Radio />} label="Radio B" />
                </RadioGroup>
                <Slider defaultValue={60} marks={sliderMarks} />
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Navigation">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="#">
                    Home
                  </Link>
                  <Link underline="hover" color="inherit" href="#">
                    Library
                  </Link>
                  <Typography color="text.primary">Data</Typography>
                </Breadcrumbs>
                <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
                  <Tab label="Overview" />
                  <Tab label="Details" />
                  <Tab label="Settings" />
                </Tabs>
                <Pagination count={10} color="primary" />
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Avatars & Badges">
                <Stack direction="row" spacing={3} alignItems="center" sx={{ flexWrap: 'wrap', gap: 3 }}>
                  <AvatarGroup max={4}>
                    <Avatar>AL</Avatar>
                    <Avatar>BT</Avatar>
                    <Avatar>GM</Avatar>
                    <Avatar>DL</Avatar>
                    <Avatar>EP</Avatar>
                  </AvatarGroup>
                  <Badge badgeContent={4} color="primary">
                    <MailIcon />
                  </Badge>
                  <Badge variant="dot" color="secondary">
                    <FavoriteIcon />
                  </Badge>
                </Stack>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Cards">
                <Card variant="outlined">
                  <CardHeader title="Card Title" subheader="Card subtitle" />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This card highlights elevation, spacing, and typography overrides.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<ShareIcon />}>
                      Share
                    </Button>
                    <Button size="small" variant="contained" startIcon={<AddIcon />}>
                      Action
                    </Button>
                  </CardActions>
                </Card>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Lists & Dividers">
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" secondary="Overview" />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" secondary="Account settings" />
                  </ListItem>
                  <Divider component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Preferences" secondary="Theme & layout" />
                  </ListItem>
                </List>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Tables">
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat</TableCell>
                        <TableCell align="right">Carbs</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableRows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Progress & Skeleton">
                <Stack spacing={2}>
                  <LinearProgress />
                  <Stack direction="row" spacing={2} alignItems="center">
                    <CircularProgress size={32} />
                    <Typography variant="body2">Loading state</Typography>
                  </Stack>
                  <Stack spacing={1}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="rectangular" height={80} />
                  </Stack>
                </Stack>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Accordion & Paper">
                <Stack spacing={2}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="body2">Outlined paper surface</Typography>
                  </Paper>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Accordion One</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        Expanded content shows the accordion styles.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Accordion Two</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2">
                        Additional details inside the second panel.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Stack>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Stepper">
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Stack direction="row" spacing={2}>
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
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Menus & Popover">
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<MenuIcon />}
                    onClick={(event) => setMenuAnchorEl(event.currentTarget)}
                  >
                    Open Menu
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<InfoIcon />}
                    onClick={(event) => setPopoverAnchorEl(event.currentTarget)}
                  >
                    Open Popover
                  </Button>
                  <Tooltip title="Tooltip example" arrow>
                    <IconButton color="primary">
                      <SettingsIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Dialog & Drawer">
                <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                  <Button variant="outlined" onClick={() => setDialogOpen(true)}>
                    Open Dialog
                  </Button>
                  <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
                    Open Drawer
                  </Button>
                </Stack>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Toolbar">
                <Paper variant="outlined">
                  <Toolbar>
                    <IconButton color="inherit">
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      Toolbar Title
                    </Typography>
                    <IconButton color="inherit">
                      <SettingsIcon />
                    </IconButton>
                  </Toolbar>
                </Paper>
              </Section>
            </Grid>

            <Grid item xs={12} md={6}>
              <Section title="Autocomplete">
                <Autocomplete
                  options={['Phoenix', 'Oslo', 'Tokyo', 'Lisbon']}
                  renderInput={(params) => <TextField {...params} label="City" />}
                />
              </Section>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            This dialog highlights the component override animations.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setDialogOpen(false)}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 2 }} role="presentation">
          <Typography variant="h6" gutterBottom>
            Drawer Panel
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
          <Button fullWidth variant="outlined" onClick={() => setDrawerOpen(false)}>
            Close
          </Button>
        </Box>
      </Drawer>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={() => setMenuAnchorEl(null)}
      >
        <MenuItem onClick={() => setMenuAnchorEl(null)}>Profile</MenuItem>
        <MenuItem onClick={() => setMenuAnchorEl(null)} selected>
          My Account
        </MenuItem>
        <MenuItem onClick={() => setMenuAnchorEl(null)}>Logout</MenuItem>
      </Menu>

      <Popover
        anchorEl={popoverAnchorEl}
        open={Boolean(popoverAnchorEl)}
        onClose={() => setPopoverAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ p: 2, maxWidth: 240 }}>
          <Typography variant="subtitle1" gutterBottom>
            Popover content
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use popovers for contextual details and quick actions.
          </Typography>
        </Box>
      </Popover>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          Snackbar message
        </Alert>
      </Snackbar>
    </Box>
  );
};
