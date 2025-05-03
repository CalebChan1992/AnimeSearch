import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <Card
      sx={{
        width: 225,
        height: 'auto',
        transition: 'transform 0.2s',
        boxShadow: 'none',
        mb: 2,
        '&:hover': {
          transform: 'scale(1.03)',
        }
      }}
      component={Link}
      to={`/anime/${anime.mal_id}`}
      style={{ textDecoration: 'none' }}
    >
      <CardMedia
        component="img"
        height="300"
        image={anime.images.jpg.image_url}
        alt={anime.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 1, pb: 2 }}>
        <Typography
          variant="body2"
          component="h3"
          sx={{
            fontWeight: 'medium',
            height: '2.5rem',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            mb: 0.5,
            fontSize: '0.85rem',
            color: '#333'
          }}
        >
          {anime.title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {anime.type || 'TV'} • {anime.episodes || '?'} eps
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AnimeCard;
