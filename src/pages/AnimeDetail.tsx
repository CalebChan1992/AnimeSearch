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
    <div className="anime-detail-container">
      <div className="anime-detail-layout">
        <div className="anime-image-container">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="anime-cover"
          />
          <Link to="/" className="back-button">← Back</Link>
        </div>

        <div className="anime-content">
          <div className="synopsis-section">
            <h2>Synopsis</h2>
            <p>{anime.synopsis || 'No synopsis available.'}</p>
          </div>

          <div className="anime-stats-row">
            <div className="stat-box score-box">
              <div className="stat-value score-value">{anime.score || 'N/A'}</div>
              <div className="stat-label">SCORE</div>
            </div>

            <div className="stat-box rank-box">
              <div className="stat-value rank-value">#{anime.mal_id || '?'}</div>
              <div className="stat-label">RANK</div>
            </div>

            <div className="stat-box popularity-box">
              <div className="stat-value popularity-value">#{anime.mal_id || '?'}</div>
              <div className="stat-label">POPULARITY</div>
            </div>

            <div className="stat-box members-box">
              <div className="stat-value members-value">{anime.episodes ? anime.episodes.toLocaleString() : '?'}</div>
              <div className="stat-label">MEMBERS</div>
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


    </div>
  );
};

export default AnimeDetail;
