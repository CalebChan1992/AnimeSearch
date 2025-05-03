import { Link } from 'react-router-dom';
import { Anime } from '../types/anime';

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <div className="anime-card">
      <Link to={`/anime/${anime.mal_id}`}>
        <img 
          src={anime.images.jpg.image_url} 
          alt={anime.title} 
          className="anime-image"
        />
        <div className="anime-info">
          <h3 className="anime-title">{anime.title}</h3>
          <div className="anime-meta">
            <span className="anime-score">⭐ {anime.score || 'N/A'}</span>
            <span className="anime-episodes">{anime.episodes || '?'} eps</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AnimeCard;
