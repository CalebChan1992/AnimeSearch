import { Anime } from '../types/anime';
import AnimeCard from './AnimeCard';
import { Box, Typography, CircularProgress, Container } from '@mui/material';
import { SortOption } from './SortSelector';
import { useMemo } from 'react';

interface AnimeListProps {
  animeList: Anime[];
  loading: boolean;
  sortBy?: SortOption;
}

const AnimeList = ({ animeList, loading, sortBy = 'none' }: AnimeListProps) => {
  // Sort the anime list based on the selected sort option
  const sortedAnimeList = useMemo(() => {
    if (sortBy === 'none') return animeList;

    return [...animeList].sort((a, b) => {
      // Handle undefined values by placing them at the end
      if (sortBy === 'rank') {
        if (a.rank === undefined) return 1;
        if (b.rank === undefined) return -1;
        // Lower rank is better (rank 1 is the best), so sort in ascending order
        return a.rank - b.rank;
      }

      if (sortBy === 'score') {
        if (a.score === undefined) return 1;
        if (b.score === undefined) return -1;
        // Higher score is better, so sort in descending order
        return b.score - a.score;
      }

      if (sortBy === 'popularity') {
        if (a.popularity === undefined) return 1;
        if (b.popularity === undefined) return -1;
        // Lower popularity rank is better (popularity rank 1 is the best), so sort in ascending order
        return a.popularity - b.popularity;
      }

      if (sortBy === 'members') {
        if (a.members === undefined) return 1;
        if (b.members === undefined) return -1;
        // More members is better, so sort in descending order
        return b.members - a.members;
      }

      return 0;
    });
  }, [animeList, sortBy]);
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
        {sortedAnimeList.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </Box>
    </Container>
  );
};

export default AnimeList;
