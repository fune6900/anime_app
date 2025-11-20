import { useEffect, useState } from 'react';
import './App.css'

type Anime = {
  id: number;
  original_name: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
};

type AnimeJson = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

function App() {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const [keyword, setKeyword] = useState("");
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  const fetchAnimeList = async () => {
    let url = ""
    if (keyword) {
      url = `https://api.themoviedb.org/3/search/tv?query=${keyword}&include_adult=false&language=ja&page=1`;
    }
    else {
      url = `https://api.themoviedb.org/3/search/tv?include_adult=false&language=ja&page=1`;
    }
    const response = await fetch(
      url,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    setAnimeList(data.results.map((anime: AnimeJson) => ({
      id: anime.id,
      original_name: anime.original_name,
      poster_path: anime.poster_path,
      overview: anime.overview,
      genre_ids: anime.genre_ids,
    })
    ));
    console.log(data.results);  
  };

  useEffect(() => { 
    fetchAnimeList();
  }, [keyword]);

  return (
    <div>
      <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder="タイトルで検索" />
      <p>検索キーワード: {keyword}</p>
      {animeList
        .filter((anime) => anime.original_name.includes(keyword))
        .filter((anime) => anime.genre_ids.includes(16))
        .map((anime) => (
        <div key={anime.id}>
          <h2>{anime.original_name}</h2>
          <img src={`https://media.themoviedb.org/t/p/w600_and_h900_bestv2/${anime.poster_path}`} alt={anime.original_name} />
          <p>{anime.overview}</p>
        </div>
      ))}
    </div>
  )
}

export default App
