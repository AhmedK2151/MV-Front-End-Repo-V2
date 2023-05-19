import { ArrowBackSharp, ArrowForwardSharp } from "@mui/icons-material"
import { Alert, AlertTitle, Button, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import MovieCard from "../MovieCard/MovieCard"
import { SearchInfo, SingleMovie } from "./fetch"
import { useNavigate, useParams } from "react-router-dom"
import { ShowMovie } from "./ShowMovie"
import { Style } from "util"

type PageSwitcher = {
  totalPages: number
  searchValue: string | undefined
  pageNum: number
  style?: Style
}

function PageSwitcher(props: PageSwitcher) {

  const { totalPages, searchValue, pageNum } = props
  const navigate = useNavigate()
  return(
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '16px',
        paddingTop: '16px'
      }}>
      <Button
        variant='contained'
        onClick={() => {
          navigate(`/search/${searchValue}/${pageNum === 1 ? 1 : pageNum - 1}`)
        }}>
        <ArrowBackSharp />
      </Button>
      <Typography 
        variant="h5"
        style={{
          paddingInline: '12px'
        }}>
        {pageNum}/{totalPages}
      </Typography>
      <Button
        variant='contained'
        onClick={() => {
          navigate(`/search/${searchValue}/${pageNum + 1}`)
        }}>
        <ArrowForwardSharp />
      </Button>
    </div>
  )
}

var header = new Headers()
header.append("Authorization", `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`)

function GetMovieByTitle() {

  const params = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState<SearchInfo>()
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
      Number(movie.results) < 1 &&
      params.search_value && params.search_value.length > 2
      ? setError(true)
      : setError(false)
  }, [movie, params.search_value])

    return(
      <div>
        
        { movie &&
          <div style={{marginTop: '-16px'}}>
            <PageSwitcher
              totalPages={movie.total_pages}
              searchValue={params.search_value} 
              pageNum={pageNum} 
            />
          </div>
        }

        {movie &&
          <ShowMovie searchInfo={movie!} />
        }

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

        { movie &&
          <PageSwitcher
            totalPages={movie.total_pages}
            searchValue={params.search_value} 
            pageNum={pageNum} 
          />
        }
      </div>
    )
}

export default GetMovieByTitle
