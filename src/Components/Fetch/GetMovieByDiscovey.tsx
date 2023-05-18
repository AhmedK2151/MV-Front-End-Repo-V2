import { ArrowBackSharp, ArrowForwardSharp } from "@mui/icons-material"
import { Button, Chip, Stack, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { Accordion } from "../Accordion/Accordion"
import MovieCard from "../MovieCard/MovieCard"
import { SearchInfo, SingleMovie } from "./fetch"
import { useNavigate, useParams } from "react-router-dom"
import { ShowMovie } from "./ShowMovie"

type PageSwitcher = {
  filter: string
  order: string
  pageNum: number
  searchInfo: SearchInfo
}

function PageSwitcher(props: PageSwitcher) {

  const { filter, order, pageNum, searchInfo } = props
  const navigate = useNavigate()

  return(
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '16px',
      }}>
      <Button
        variant='contained'
        onClick={() => {
          //setPageNum(pageNum === 1 ? 1 : pageNum - 1)
          navigate(`/home/${filter}/${order}/${pageNum === 1 ? 1 : pageNum - 1}`)
        }}>
        <ArrowBackSharp />
      </Button>
      <Typography 
        variant="h5"
        style={{
          paddingInline: '12px'
        }}>
        {pageNum}/{searchInfo && searchInfo.total_pages}
      </Typography>
      <Button
        variant='contained'
        onClick={() => {
          //setPageNum(pageNum + 1)
          navigate(`/home/${filter}/${order}/${pageNum + 1}`)
        }}>
        <ArrowForwardSharp />
      </Button>
    </div>
  )
}

var header = new Headers()
header.append("Authorization", `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`)

function GetMovieByDiscovery() {

  const [movie, setMovie] = useState<any>()
  const [error, setError] = useState<boolean>()
  
  const params = useParams()
  const navigate = useNavigate()

  const [filter, setFilter] = useState('popularity')
  const [order, setOrder] = useState('desc')
  const [loading, setLoading] = useState<boolean>(true)
  const [pageNum, setPageNum] = useState<number>(1)

  useEffect(() => {
    setFilter(params.page ?? 'popularity')
    setOrder(params.order ?? 'desc')
    setPageNum(Number(params.page_num) ?? 1)
  }, [params, filter, order])

  useMemo(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?&language=en-US&sort_by=${filter}.${order}&include_adult=false&page=${pageNum}`, {
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
      console.log(JSON.stringify(movie, null, 4))
    })
    .catch((error) => 
      console.log(`error: ${error}`)
    )

  }, [filter, order, pageNum, params])

    return(
      <div>
        <div style={{paddingBottom: '16px'}}>
          <Accordion
            header={`Filter by 
            ${filter === 'popularity' ? 'Popularity' : ''}
            ${filter === 'release_date' ? 'Release Date' : ''}
            ${filter === 'vote_average' ? 'Vote Average' : ''}
            `}
            accordionType='top'
            detailContent={
              <Stack direction='row' spacing={1}>
                <Chip 
                  label='Popularity'
                  color={filter === 'popularity' ? 'primary' : 'default'}
                  onClick={
                    () => navigate(`/home/popularity/${order}/1`)
                  }/>
                <Chip
                  label='Release Date'
                  color={filter === 'release_date' ? 'primary' : 'default'}
                  onClick={
                    () => navigate(`/home/release_date/${order}/1`)
                  }/>
                <Chip
                  label='Rating'
                  color={filter === 'vote_average' ? 'primary' : 'default'}
                  onClick={
                    () => navigate(`/home/vote_average/${order}/1`)
                  }/>
              </Stack>
            }
          />

          <Accordion
            header={`Order By ${order === 'asc' ? 'Ascending' : 'Descending'}`}
            accordionType='bottom'
            detailContent={
              <Stack direction='row' spacing={1}>
                <Chip
                  label='Ascending'
                  color={ order === 'asc' ? 'primary' : 'default'}
                  onClick={
                    () => navigate(`/home/${filter}/asc/1`)
                  }
                />
                <Chip
                  label='Descending'
                  color={ order === 'desc' ? 'primary' : 'default'}
                  onClick={
                    () => navigate(`/home/${filter}/desc/1`)
                  }
                />
              </Stack>
            }
          />
        </div>
        <PageSwitcher
          order={order}
          filter={filter}
          pageNum={pageNum}
          searchInfo={movie}
        />
        <div style={{justifyContent: 'center'}}>
          <ShowMovie searchInfo={movie} />
        </div>
        { movie && !loading &&
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '16px',
            }}>
            <PageSwitcher
              order={order}
              filter={filter}
              pageNum={pageNum}
              searchInfo={movie}
            />
          </div>
      }
      </div>
    )
}

export default GetMovieByDiscovery