import { Box, Grid, GridProps, styled } from "@mui/material";
import GetMovieByDiscovery from "../../Components/Fetch/GetMovieByDiscovey";
import './HomePage.css'

export const SideContent = styled(Grid)<GridProps>(({theme}) => ({
  [theme.breakpoints.down('xs')]: {
    display: 'none',
  },
  
})) as typeof Grid

function HomePage() {

  return(
    <Box
      sx={{
        flexGrow: 1,
        height: '100%',
      }}>
      <Grid
        container
        sx={{height: '100%', }}>
        <SideContent item sm={2} />

        <Grid 
          item
          sm={8}
          sx={{
            marginInline: '4px',
            justifyContent: 'center',
          }}>
            <GetMovieByDiscovery/>
        </Grid>

        <SideContent item sm={2}/>
      </Grid>
    </Box>
  )
}

export default HomePage