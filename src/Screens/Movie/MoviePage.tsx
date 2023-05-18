import { Box, Grid, Paper, Rating, Typography, useTheme } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { SingleMovie } from "../../Components/Fetch/fetch";
import { SideContent } from "../HomePage/HomePage";
import { ImageNotSupported } from "@mui/icons-material";

function Movie() {
  const theme = useTheme()

  const location = useLocation()
  const state = location.state as SingleMovie
  return(
    <Box
      sx={{
        flexGrow: 1,
        height: '100%'
      }}>
      <Grid
        container
        sx={{height: '100%'}}>
        <SideContent item sm={1}/>

        <Grid 
          item
          xs={12}
          sm={10}
          sx={{ marginInline: '4px' }}>
            <Paper
              variant='outlined'
              square={false}
              sx={{
                display: 'flex',
                width: '100%',
                borderRadius: theme.border.radius.small
              }}>
                {state.poster_path ? ( 
                  <Box
                    component='img'
                    src={`https://image.tmdb.org/t/p/original${state.poster_path}`}
                    sx={{
                      width: '30%',
                      borderRadius: theme.border.radius.small
                    }} /> )
                  : (
                  <ImageNotSupported
                    sx={{
                      width: '30%',
                      fontSize: '200px',
                      borderRadius: theme.border.radius.small
                    }}/>)
                }
                <Box 
                  sx={{
                    width: '70%',
                    paddingX: '16px',
                    alignItems: 'flex-start'
                  }}
                >
                  <Typography
                    variant='h3'
                    paddingY={'16px'}
                  >
                    {state.title}
                  </Typography>
                  <Rating
                    size='medium'
                    value={
                      state.vote_average ? Math.round(state.vote_average/2) : 0
                    }
                    precision={0.5}
                    readOnly={true}
                  />
                  <Typography
                    variant='body1'
                    paddingTop="16px"
                  >
                    {state.release_date}
                  </Typography>
                  <Typography
                    variant='body1'
                    paddingY='16px'
                  >
                    {state.overview}
                  </Typography>
              </Box>
            </Paper>
        </Grid>

        <SideContent item sm={1} />
      </Grid>
    </Box>
  )
}

export default Movie