import React from "react";
import { SearchInfo, SingleMovie } from "./fetch";
import MovieCard from "../MovieCard/MovieCard";
import { Stack } from "@mui/material";

type ShowMovieProps = {
    searchInfo: SearchInfo
}

export function ShowMovie(props: ShowMovieProps) {

    const { searchInfo } = props

    return(
        <div style={{display: "flex", flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            { searchInfo ? (
            searchInfo.results.map((data: SingleMovie ) => (
                <MovieCard
                    id={data.id}
                    title={data.title}
                    key={data.id}
                    overview={data.overview}
                    posterPath={data.poster_path}
                    rating={data.vote_average}
                    releaseDate={data.release_date}/>
            ))
            ) : (null) }
        </div>
    )
  }