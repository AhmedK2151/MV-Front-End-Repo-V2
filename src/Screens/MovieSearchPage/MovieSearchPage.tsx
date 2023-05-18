import { Box, Grid } from "@mui/material";
import React from "react";
import { SideContent } from "../HomePage/HomePage";
import GetMovieByTitle from "../../Components/Fetch/GetMovieByTitle";

function MovieSearchPage() {
  return(
    <Box
      sx={{
        flexGrow: 1,
        height: '100%'
      }}>
      <Grid
        container
        sx={{height: '100%'}}>
        <SideContent item sm={2}/>

        <Grid 
          item
          xs={12}
          sm={8}
          sx={{ marginInline: '4px' }}>
            <GetMovieByTitle />
        </Grid>

        <SideContent item sm={2} />
      </Grid>
    </Box>
  )
}

export default MovieSearchPage