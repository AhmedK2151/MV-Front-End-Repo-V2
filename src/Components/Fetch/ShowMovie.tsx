import React, { useEffect } from "react";
import { SearchInfo, SingleMovie } from "./fetch";
import MovieCard from "../MovieCard/MovieCard";
import { Grid } from "@mui/material";

type ShowMovieProps = {
    searchInfo: SearchInfo
}

export function ShowMovie(props: ShowMovieProps) {

    const { searchInfo} = props

    return(
        <Grid
            container
            spacing={2}
            sx={{justifyContent: 'center'}}>
            { searchInfo && (
                searchInfo.results.map(
                    (data: SingleMovie) => (
                        <Grid item xs={'auto'}>
                            <MovieCard
                                id={data.id}
                                title={data.title}
                                key={data.id}
                                overview={data.overview}
                                posterPath={data.poster_path}
                                rating={data.vote_average}
                                releaseDate={data.release_date}/>
                        </Grid>
                    )
                )
            )}
        </Grid>
    )
  }