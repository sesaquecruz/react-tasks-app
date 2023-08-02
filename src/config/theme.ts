import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
 palette: {
    mode: 'light',
    primary: {  
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff', 
    },
    secondary: { 
      main: '#222222',
    },
    warning : {
      main: '#E50914',
    }
  },
});

export const darkTheme = createTheme({
  palette: {
     mode: 'dark',
     background: { default: "#222222" },
     primary: {  
       main: '#1976d2',
       light: '#42a5f5',
       dark: '#1565c0',
       contrastText: '#fff', 
     },
     secondary: { 
       main: '#f5f5f1',
     },
     warning : {
       main: '#E50914',
     }
   },
 });
