import { Anime } from '../types/anime';
import AnimeCard from './AnimeCard';

interface AnimeListProps {
  animeList: Anime[];
  loading: boolean;
}

const AnimeList = ({ animeList, loading }: AnimeListProps) => {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (animeList.length === 0) {
    return <div className="no-results">No anime found. Try a different search.</div>;
  }

  return (
    <div className="anime-list">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
};

export default AnimeList;
