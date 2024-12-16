import React from 'react';
import { createTheme } from '@mui/material/styles';
import { TypographyProps } from '@mui/material/Typography';




// window.defaultTheme: (Window & globalThis) = defaultTheme;



export function GenericCustomComponent<C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }>,
) {
  /* ... */
}

// export interface ComponentProps<T> {
//   items: T[];
//   children[]: React.ReactNode;
//   renderItem?: (item: T) => React.ReactNode;
// }


// export function List<T>(props: ComponentProps<T>) {
//   const { items, renderItem } = props;
//   const [state, setState] = React.useState<T[]>([]); // You can use type T in List function scope.
//   return (
//     <div>
//       {items.map(renderItem)}
//       <button onClick={() => setState(items)}>Clone</button>
//       {JSON.stringify(state, null, 2)}
//     </div>
//   );
// }

/* override example */
// const theme = createTheme({
//   components: {
//     MuiTypography: {
//       styleOverrides: ({ ownerState }) => ({
//         ...ownerState.color === 'secondary' && {
//           marginTop: '20px',
//         },
//       }),
//     },
//   },
// });
