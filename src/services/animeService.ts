import axios from 'axios';
import { AnimeResponse, Anime } from '../types/anime';

const API_URL = 'https://api.jikan.moe/v4';

interface JikanAnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
}

interface JikanSingleAnimeResponse {
  data: Anime;
}

export const searchAnime = async (query: string, page: number = 1): Promise<AnimeResponse> => {
  try {
    const response = await axios.get<JikanAnimeResponse>(`${API_URL}/anime`, {
      params: {
        q: query,
        page,
        limit: 20,
      },
    });
    return response.data as AnimeResponse;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

export const getAnimeById = async (id: number): Promise<Anime> => {
  try {
    const response = await axios.get<JikanSingleAnimeResponse>(`${API_URL}/anime/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching anime with ID ${id}:`, error);
    throw error;
  }
};

export const getTopAnime = async (page: number = 1): Promise<AnimeResponse> => {
  try {
    const response = await axios.get<JikanAnimeResponse>(`${API_URL}/top/anime`, {
      params: {
        page,
        limit: 20,
      },
    });
    return response.data as AnimeResponse;
  } catch (error) {
    console.error('Error fetching top anime:', error);
    throw error;
  }
};
