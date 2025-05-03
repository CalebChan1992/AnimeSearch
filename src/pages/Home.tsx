import { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBar from '../components/SearchBar';
import AnimeList from '../components/AnimeList';
import Pagination from '../components/Pagination';
import { getTopAnime, searchAnime } from '../services/animeService';
import { Anime } from '../types/anime';

const Home = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Use a ref to track if this is the initial render
  const isInitialRender = useRef(true);

  // Use a ref to track the last search parameters to prevent duplicate API calls
  const lastSearchRef = useRef({ query: '', page: 0 });

  useEffect(() => {
    // Check if this is a duplicate call with the same parameters
    if (
      lastSearchRef.current.query === searchQuery &&
      lastSearchRef.current.page === currentPage &&
      !isInitialRender.current
    ) {
      return;
    }

    // Update the last search parameters
    lastSearchRef.current = { query: searchQuery, page: currentPage };

    const fetchAnime = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery) {
          response = await searchAnime(searchQuery, currentPage);
        } else {
          response = await getTopAnime(currentPage);
        }

        // Filter out duplicate anime IDs, keeping only the first occurrence
        const seenIds = new Set<number>();
        const uniqueData = response.data.filter(anime => {
          if (seenIds.has(anime.mal_id)) {
            // This is a duplicate, skip it
            return false;
          } else {
            // This is the first occurrence, keep it
            seenIds.add(anime.mal_id);
            return true;
          }
        });

        // Replace the response data with our deduplicated array
        response.data = uniqueData;

        // Update state only if component is still mounted
        setAnimeList(response.data);
        setTotalPages(response.pagination.last_visible_page);

        // After the first successful fetch, mark initial render as complete
        isInitialRender.current = false;
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchAnime();
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();

    // Only update if the query has actually changed
    if (trimmedQuery !== searchQuery) {
      // If query is empty, reset to show top anime
      setSearchQuery(trimmedQuery);

      // Only reset page if we're not already on page 1
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
    }
  };

  const handlePageChange = (page: number) => {
    // Prevent changing to the same page
    if (page === currentPage) {
      return;
    }

    // Update the current page state directly without setTimeout
    // This avoids potential race conditions with React's batched updates
    setCurrentPage(page);

    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box>
      <SearchBar onSearch={handleSearch} isLoading={loading} debounceTime={250} />

      <Container maxWidth={false} sx={{ width: '1200px' }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mt: 4,
            mb: 2,
            color: 'text.secondary',
            fontWeight: 500
          }}
        >
          {searchQuery ? `Results for "${searchQuery}"` : 'Top Anime'}
        </Typography>

        <AnimeList animeList={animeList} loading={loading} />

        {!loading && animeList.length > 0 && (
          <Box component="div" onClick={(e) => e.stopPropagation()}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
