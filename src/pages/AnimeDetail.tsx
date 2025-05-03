import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnimeById } from '../services/animeService';
import { Anime } from '../types/anime';

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!anime) {
    return <div className="not-found">Anime not found</div>;
  }

  return (
    <div className="anime-detail">
      <Link to="/" className="back-button">← Back to Search</Link>

      <div className="anime-header">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="anime-cover"
        />

        <div className="anime-header-info">
          <h1 className="anime-title">{anime.title}</h1>

          <div className="anime-stats">
            <div className="stat">
              <span className="stat-label">Score:</span>
              <span className="stat-value">{anime.score || 'N/A'}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Episodes:</span>
              <span className="stat-value">{anime.episodes || 'Unknown'}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Status:</span>
              <span className="stat-value">{anime.status}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Aired:</span>
              <span className="stat-value">
                {anime.aired.from ? new Date(anime.aired.from).toLocaleDateString() : 'Unknown'}
                {anime.aired.to ? ` to ${new Date(anime.aired.to).toLocaleDateString()}` : ''}
              </span>
            </div>
          </div>

          <div className="anime-genres">
            {anime.genres.map(genre => (
              <span key={genre.mal_id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="anime-synopsis">
        <h2>Synopsis</h2>
        <p>{anime.synopsis || 'No synopsis available.'}</p>
      </div>
    </div>
  );
};

export default AnimeDetail;
