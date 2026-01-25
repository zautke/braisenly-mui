import alert from './alert';
import autocomplete from './autocomplete';
import avatar from './avatar';
import badge from './badge';
import breadcrumbs from './breadcrumbs';
import button from "./button";
import card from './card';
import checkbox from './checkbox';
import chip from './chip';
import cssBaseLine from "./cssBaseLine";
import dataGrid from './dataGrid';
import dialog from './dialog';
import divider from './divider';
import drawer from './drawer';
import accordion from './accordion';
import form from './form';
import input from './input';
import link from './link';
import list from './list';
import menu from './menu';
import pagination from './pagination';
import paper from './paper';
import popover from './popover';
import progress from './progress';
import radio from './radio';
import select from "./select";
import skeleton from './skeleton';
import slider from './slider';
import snackbar from './snackbar';
import stepper from './stepper';
import switchSelect from "./switch";
import table from './table';
import tabs from './tabs';
import toolbar from './toolbar';
import tooltip from './tooltip';
import svgIcon from './svg-icon';

const allOverrides: any = {
  ...alert,
  ...autocomplete,
  ...avatar,
  ...badge,
  ...breadcrumbs,
  ...button,
  ...card,
  ...checkbox,
  ...chip,
  ...cssBaseLine,
  ...dataGrid,
  ...dialog,
  ...divider,
  ...drawer,
  ...accordion,
  ...form,
  ...input,
  ...link,
  ...list,
  ...menu,
  ...pagination,
  ...paper,
  ...popover,
  ...progress,
  ...radio,
  ...select,
  ...skeleton,
  ...slider,
  ...snackbar,
  ...stepper,
  ...switchSelect,
  ...table,
  ...tabs,
  ...toolbar,
  ...tooltip,
  ...svgIcon,
};

export const styleOverrides = allOverrides;

export default allOverrides;
