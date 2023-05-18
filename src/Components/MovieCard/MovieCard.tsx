import { BrokenImage } from "@mui/icons-material";
import { 
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  PaperProps,
  styled,
  Typography, 
  useTheme} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardContainer = styled(Paper)<PaperProps>(({theme}) => ({
  marginTop: 16,
  // '& .MuiPaper-root:hover': {
  //   backgroundColor: alpha(theme.highlight.highlight, 0.1)
  // }
})) as typeof Paper

type MovieCardProps = {
  title?: string,
  overview?: string,
  posterPath?: string | null,
  id?: number,
  rating?: number,
  releaseDate?: string
}

function MovieCard(props: MovieCardProps) {
  const { title, overview, posterPath, id, rating, releaseDate } = props

  const navigate = useNavigate()
  const theme = useTheme()

  return(
      <Card
        sx={{
          maxWidth: '150px',
          marginBottom: '16px',
          borderWidth: '2px',
          borderStyle: 'solid',
          borderColor: 'transparent',
          borderRadius: theme.border.radius.small,
          ':hover': {
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: theme.border.primaryColour,
          }
        }}
        onClick={() =>
          navigate(`/movie/${id}`, { state: {
            title: title,
            overview: overview,
            poster_path: posterPath,
            vote_average: rating,
            release_date: releaseDate,
          }})
        }>
          { posterPath ?
            <CardMedia
              src={`https://image.tmdb.org/t/p/original${posterPath}`}
              component='img'
              sx={{
                width: '150px',
                height: '225px'
              }}/>
          : <BrokenImage style={{width: '150px', height: '225px'}}/>}
            <CardContent
              sx={{padding: '8px', marginBottom: '-8px'}}
            >
              <Typography variant='body2'>
                {title ?? 'N/A'}
              </Typography>
            </CardContent>
      </Card>

  )
}

export default MovieCard