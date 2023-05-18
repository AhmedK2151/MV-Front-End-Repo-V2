import { BrokenImage } from "@mui/icons-material";
import { 
  Card,
  CardContent,
  CardMedia,
  Typography, 
  styled, 
  useTheme} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardContentLessPadding = styled(CardContent)(`
  padding: 8px;
  &:last-child {
    padding-bottom: 0;
  }
`);

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
          height: '100%',
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
              loading='lazy'
              placeholder="Loading"          
              sx={{
                width: '150px',
                height: '225px'
              }}/>
          : <BrokenImage style={{width: '150px', height: '225px'}}/>}
            <CardContentLessPadding>
              <Typography variant='body2'>
                {title ?? 'N/A'}
              </Typography>
            </CardContentLessPadding>
      </Card>

  )
}

export default MovieCard