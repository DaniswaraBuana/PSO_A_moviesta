export interface CelebrityType {
  id: string;
  created_at: string;
  name: string;
  birth_date: string;
  birth_place: string;
  profile_image: string;
  biography: string;
  known_for: string; // Actor, Director, Producer, etc.
  popularity_score: number;
  movies: string[]; // Array of movie IDs
}

export interface CelebrityNewsType {
  id: string;
  created_at: string;
  title: string;
  content: string;
  image_url: string;
  celebrity_id: string;
  celebrity_name: string;
  published_date: string;
}

export interface CelebrityResponseType {
  data: CelebrityType[];
  total: number;
}

export interface CelebrityNewsResponseType {
  data: CelebrityNewsType[];
  total: number;
}
