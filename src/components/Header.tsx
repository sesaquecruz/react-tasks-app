import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { auth } from "../features/auth/auth";

type Props = {
  toggle: () => void;
  theme: string;
}

export function Header(props: Props) {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated)
      auth.setIsAuthenticated(isAuthenticated)
      auth.setAccessTokenSilently(getAccessTokenSilently)
  }, [isAuthenticated, isLoading, getAccessTokenSilently]);

  return (
    <Box sx={{ flexGrow: 1 }}>
         <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Typography
              color="inherit"
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                boxShadow: "none"
              }}
              >
              Home
            </Typography>
            { !isAuthenticated ? <></> :
              <Typography
                color="inherit"
                variant="h6"
                component={Link}
                to="/tasks"
                sx={{
                  textDecoration: "none",
                  boxShadow: "none",
                  ml: 2
                }}
                >
                Tasks
              </Typography>
            }
          </Box>
          { !isAuthenticated ?
              <Button
                color="inherit"
                component={Link}
                to="/"
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
            :
            <Button
              color="inherit"
              component={Link}
              to="/"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Logout
            </Button>
          }
          <IconButton 
            sx={{ 
              ml: 1 
            }} 
            onClick={ props.toggle } 
            color="inherit"
          >
            { props.theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
    </Box>
  )
}
