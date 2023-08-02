import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box display="flex-column" p={5}>
      <Box display="flex" justifyContent="center" p={3}>
        <Typography variant="h3" color="secondary">Task App</Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box 
          component="img" 
          alt="Checklist logo" 
          src="images/logo.png" 
          sx={{
            maxWidth: { xs: 250, md: 250 },
            ml: 7
          }}/>
      </Box>
    </Box>
  )
}
