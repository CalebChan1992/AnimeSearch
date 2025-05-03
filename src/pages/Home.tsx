import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      try {
        let response;
        if (searchQuery) {
          response = await searchAnime(searchQuery, currentPage);
        } else {
          response = await getTopAnime(currentPage);
        }
        setAnimeList(response.data);
        setTotalPages(response.pagination.last_visible_page);
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchAnime();
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    // If query is empty, reset to show top anime
    setSearchQuery(query.trim());
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="home-page">
      <h1 className="page-title">Anime Search</h1>
      <SearchBar onSearch={handleSearch} isLoading={loading} debounceTime={400} />

      <h2 className="section-title">
        {searchQuery ? `Results for "${searchQuery}"` : 'Top Anime'}
      </h2>

      <AnimeList animeList={animeList} loading={loading} />

      {!loading && animeList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Home;
