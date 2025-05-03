import { Anime } from '../types/anime';
import AnimeCard from './AnimeCard';
import { Box, Typography, CircularProgress, Container } from '@mui/material';

interface AnimeListProps {
  animeList: Anime[];
  loading: boolean;
}

const AnimeList = ({ animeList, loading }: AnimeListProps) => {
  if (loading) {
    return (
      <Container maxWidth={false} sx={{ width: '1200px', px: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={40} />
        </Box>
      </Container>
    );
  }

  if (animeList.length === 0) {
    return (
      <Container maxWidth={false} sx={{ width: '1200px', px: 2 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No anime found. Try a different search.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ width: '1200px', px: 2 }}>
      <Box
        sx={{
          mt: 3,
          mb: 3,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))',
          gap: 4,
          justifyItems: 'center'
        }}
      >
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </Box>
    </Container>
  );
};

export default AnimeList;
