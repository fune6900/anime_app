import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import './AnimeDetail.css'
import { ArrowLeft, Clock, Star } from "lucide-react";

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
  original_language: string;
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

  const fetchAnimeDetail = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=ja`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    const data: AnimeDetailJson = await response.json();
    setAnime({
      id: data.id,
      original_name: data.original_name,
      poster_path: data.poster_path,
      overview: data.overview,
      year: Number(data.first_air_date.split("-")[0]),
      rating: data.vote_average,
      runtime: data.episode_run_time[0],
      score: data.popularity,
      genres: data.genres.map((genre: {id: number; name: string; }) => genre.name),
    });
    console.log(data);  
  };

  useEffect(() => {
    fetchAnimeDetail();
  }, []);

  return (
    <div className="movie-detail-root">
      {anime && (
        <>
          <div
            className="movie-detail-backdrop"
            style={{
              backgroundImage: `url(${
                "https://image.tmdb.org/t/p/w500" + anime.poster_path
              })`,
            }}
          />
          <div className="movie-detail-backdrop-gradient" />
          <div className="movie-detail-container">
            <Link to="/" className="movie-detail-backlink">
              <ArrowLeft className="movie-detail-backlink-icon" size={20} />
              Back to home
            </Link>
            <div className="movie-detail-grid">
              <div className="movie-detail-poster-wrap">
                <img
                  src={"https://image.tmdb.org/t/p/w500" + anime.poster_path}
                  alt={anime.original_name}
                  className="movie-detail-poster-img"
                />
              </div>
              <div className="movie-detail-details">
                <h1 className="movie-detail-title">{anime.original_name}</h1>
                <div className="movie-detail-badges">
                  <span className="badge-outline">{anime.year}</span>
                  <span className="badge-outline">PG-13</span>
                  <span className="badge-outline">
                    <Clock className="badge-icon-svg" size={14} />
                    {anime.runtime}分
                  </span>
                  <span className="badge-outline">
                    <Star className="badge-icon-svg badge-star" size={14} />
                    {(anime.rating / 10).toFixed(1)}
                  </span>
                </div>
                <p className="movie-detail-overview">{anime.overview}</p>
                <div className="movie-detail-genres">
                  {anime.genres.map((g) => (
                    <span key={g} className="badge-genre">
                      {g}
                    </span>
                  ))}
                </div>
                <div className="movie-detail-actions">
                  <button className="movie-detail-btn movie-detail-btn-primary">
                    ▶ Watch Now
                  </button>
                  <button className="movie-detail-btn">
                    ＋ Add to My List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnimeDetail;
