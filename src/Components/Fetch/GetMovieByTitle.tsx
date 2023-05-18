import { ArrowBackSharp, ArrowForwardSharp } from "@mui/icons-material"
import { Alert, AlertTitle, Button, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import MovieCard from "../MovieCard/MovieCard"
import { SingleMovie } from "./fetch"
import { useNavigate, useParams } from "react-router-dom"
import { ShowMovie } from "./ShowMovie"

var header = new Headers()
header.append("Authorization", `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`)

function GetMovieByTitle() {

  const params = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState<any>()
  const [error, setError] = useState<boolean>()
  const [pageNum, setPageNum] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setPageNum(Number(params.page_num))
  }, [params.page_num])

  useMemo(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?&language=en-US&query=${params.search_value}&page=${pageNum}`, {
      method: 'GET',
      headers: header,
      redirect: 'follow'
    })
    .then( async (response) => {
      setLoading(true)
      const data = await response.json()
      setMovie(data)
    })
    .then(() => {
      setLoading(false)
    })
    .catch((error) => 
      console.log(`error: ${error}`)
    )

  }, [params.search_value, pageNum])

  useEffect(() => {
      //console.log(movie)
      movie &&
      movie.results < 1 &&
      params.search_value && params.search_value.length > 2
      ? setError(true)
      : setError(false)
  }, [movie, params.search_value])

    return(
      <div>
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Button
              variant='contained'
              onClick={() => {
                //setPageNum(pageNum === 1 ? 1 : pageNum - 1)
                navigate(`/search/${params.search_value}/${pageNum === 1 ? 1 : pageNum - 1}`)
              }}>
              <ArrowBackSharp />
            </Button>
            <Typography 
              variant="h5"
              style={{
                paddingInline: '12px'
              }}>
              {pageNum}/{movie && movie.total_pages}
            </Typography>
            <Button
              variant='contained'
              onClick={() => {
                //setPageNum(pageNum + 1)
                navigate(`/search/${params.search_value}/${pageNum + 1}`)
              }}>
              <ArrowForwardSharp />
            </Button>
          </div>

          <ShowMovie searchInfo={movie} />

          { error && (
            <Alert
              color='error'
              style={{
                marginBlockStart: 16,
              }}>
              <AlertTitle>Error</AlertTitle>
              Please Enter A Valid Movie Title
            </Alert>
          )}
        { movie && !loading &&
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '16px',
          }}>
          <Button
            variant='contained'
            onClick={() => {
              // setPageNum(pageNum === 1 ? 1 : pageNum - 1)
              navigate(`/search/${params.search_value}/${pageNum === 1 ? 1 : pageNum - 1}`)
            }}>
            <ArrowBackSharp />
          </Button>
          <Typography 
            variant="h5"
            style={{
              paddingInline: '12px'
            }}>
            {pageNum}/{movie && movie.total_pages}
          </Typography>
          <Button
            variant='contained'
            onClick={() => {
              //setPageNum(pageNum + 1)
              navigate(`/search/${params.search_value}/${pageNum + 1}`)
            }}>
            <ArrowForwardSharp />
          </Button>
        </div>}
      </div>
    )
}

export default GetMovieByTitle
