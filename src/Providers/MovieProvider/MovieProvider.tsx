import React, { ReactNode, createContext, useState } from "react";
import { SingleMovie } from "../../Components/Fetch/fetch"

export type MovieContextType = {
  movie: SingleMovie
  setMovie: (newMovie: SingleMovie) => void
}

export const MovieContext = createContext<MovieContextType>({
  movie: {
    adult: false,
    backdrop_path: null,
    genre_ids: [],
    id: 0,
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: null,
    release_date: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0
  },
  setMovie: () => undefined
})

type MovieProviderProps = {
  children?: ReactNode | ReactNode[]
}

function MovieProvider(props: MovieProviderProps) {
  const { children } = props

  const [movieValue, setMovieValue] = useState<SingleMovie>({
    adult: false,
    backdrop_path: null,
    genre_ids: [],
    id: 0,
    original_language: "",
    original_title: "",
    overview: "",
    popularity: 0,
    poster_path: null,
    release_date: "",
    title: "",
    video: false,
    vote_average: 0,
    vote_count: 0
  })

  return(
    <MovieContext.Provider value={{movie: movieValue, setMovie: setMovieValue}}>
      {children}
    </MovieContext.Provider>
  )
}

export default MovieProvider