import { useEffect, useState } from "react";
import { useParams } from "react-router";

type AnimeDetailJson = {
  adult: boolean;
  backdrop_path: string | null;
  created_by: string[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string 
  }[];
  homepage: string;
  id: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    production_code: string;
    runtime: number | null;
    season_number: number;
    show_id: number;
    still_path: string | null;
  }
  name: string;
  next_episode_to_air: string | null;
  networks: {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  originnal_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

type Anime = {
  id: string;
  original_name: string;
  poster_path: string;
  overview: string;
  year: number;
  rating: number;
  runtime: number;
  score: number;
  genres: string[];
}

function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);

  const featchAnimeDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=ja`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    setAnime({
      id: data.id,
      original_name: data.original_name,
      poster_path: data.poster_path,
      overview: data.overview,
      year: data.first_air_date.split("-")[0],
      rating: data.vote_average,
      runtime: data.episode_run_time[0],
      score: data.popularity,
      genres: data.genres.map((genre: {id: number; name: string; }) => genre.name),
    });
    console.log(data);  
  };

  useEffect(() => {
    featchAnimeDetail();
  }, []);

  return (
  <div>
    {anime && (
    <div> 
      <h2>{anime.original_name}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${anime.poster_path}`} alt={anime.original_name} />
      <p>{anime.overview}</p>
      <p>Year: {anime.year}</p>
      <p>Rating: {anime.rating}</p>
      <p>Runtime: {anime.runtime} minutes</p>
      <p>Score: {anime.score}</p>
      <p>Genres: {anime.genres}</p>
    </div>
    )}
  </div>
)};

export default AnimeDetail;
