import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  useTheme
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getAnimeById } from '../services/animeService';
import { Anime } from '../types/anime';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A page to display the details of a single anime.
 *
 * Fetches the anime details from the API when the component mounts.
 * If the anime is not found, displays an error message.
 *
 * @returns A JSX element containing the anime details.
 */
/*******  9c44c155-27f9-4ffd-a395-7ba6b54516ed  *******/const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const theme = useTheme();

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const animeData = await getAnimeById(parseInt(id));
        setAnime(animeData);
        setError('');
      } catch (err) {
        setError('Failed to load anime details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    void fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth={false} sx={{ width: '1200px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress size={40} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth={false} sx={{ width: '1200px', mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!anime) {
    return (
      <Container maxWidth={false} sx={{ width: '1200px', mt: 4 }}>
        <Alert severity="warning">Anime not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ width: '1200px', py: 2, px: 2 }}>
      {/* Title and Synopsis */}
      <Box sx={{ display: 'flex', mb: 3, gap: 4 }}>
        <Box sx={{ width: '300px' }}>
          <Box
            component="img"
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: 1,
            }}
          />
          <Button
            component={Link}
            to="/"
            variant="outlined"
            size="small"
            startIcon={<ArrowBack />}
            sx={{ mt: 2, width: '100%' }}
          >
            Back
          </Button>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
            {anime.title}
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 'medium', mb: 1 }}>
            Synopsis
          </Typography>

          <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6 }}>
            {anime.synopsis || 'No synopsis available.'}
          </Typography>

          {/* Stats Row */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Card
              sx={{
                width: 150,
                bgcolor: theme.animeStats.score.main,
                border: `1px solid ${theme.animeStats.score.dark}`,
                borderRadius: 1,
                boxShadow: 'none'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 1 }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.animeStats.score.dark
                  }}
                >
                  {anime.score || 'N/A'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'medium',
                    color: theme.animeStats.score.dark
                  }}
                >
                  Score
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                width: 150,
                bgcolor: theme.animeStats.rank.main,
                border: `1px solid ${theme.animeStats.rank.dark}`,
                borderRadius: 1,
                boxShadow: 'none'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 1 }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.animeStats.rank.dark
                  }}
                >
                  #{anime.rank || '?'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'medium',
                    color: theme.animeStats.rank.dark
                  }}
                >
                  Rank
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                width: 150,
                bgcolor: theme.animeStats.popularity.main,
                border: `1px solid ${theme.animeStats.popularity.dark}`,
                borderRadius: 1,
                boxShadow: 'none'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 1 }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.animeStats.popularity.dark
                  }}
                >
                  #{anime.popularity || '?'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'medium',
                    color: theme.animeStats.popularity.dark
                  }}
                >
                  Popularity
                </Typography>
              </CardContent>
            </Card>

            <Card
              sx={{
                width: 150,
                bgcolor: theme.animeStats.members.main,
                border: `1px solid ${theme.animeStats.members.dark}`,
                borderRadius: 1,
                boxShadow: 'none'
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 1 }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.animeStats.members.dark
                  }}
                >
                  {anime.members ? String(anime.members) : '?'}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'medium',
                    color: theme.animeStats.members.dark
                  }}
                >
                  Members
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {anime.genres.map(genre => (
              <Chip
                key={genre.mal_id}
                label={genre.name}
                variant="outlined"
                size="small"
                sx={{ borderRadius: 1 }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AnimeDetail;
