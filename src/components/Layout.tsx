import { AppBar, Box, Container, CssBaseline, ThemeProvider } from '@mui/material'
import React from 'react'
import { Header } from './Header'
import { SnackbarProvider } from 'notistack'
import { useAppTheme } from '../hooks/useAppTheme'

export function Layout({ children }: { children: React.ReactNode}) {
  const [currentTheme, toggleCurrentTheme] = useAppTheme();

  return (
    <ThemeProvider theme={currentTheme}>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <AppBar position="fixed">
            <Header 
              toggle={toggleCurrentTheme}
              theme={currentTheme.palette.mode === "dark" ? "dark" : "light"}
            />
          </AppBar>
          <Container
            maxWidth="lg"
            sx={{
              color: "white",
              my: 12
            }}
          >
            {children}
          </Container>
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
