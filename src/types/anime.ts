export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  score: number;
  episodes: number;
  status: string;
  type: string;
  aired: {
    from: string;
    to: string;
  };
  genres: {
    mal_id: number;
    name: string;
  }[];
  rank?: number;
  popularity?: number;
  members?: number;
  uniqueKey?: string | number; // Added for handling duplicate IDs in lists
}

export interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
  };
}
