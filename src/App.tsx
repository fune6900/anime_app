import { useEffect, useState } from 'react';
import './App.css'
import AnimeCard from './AnimeCard';

type Anime = {
  id: string;
  original_name: string;
  poster_path: string;
  overview: string;
  genre_ids: number[];
};

type AnimeJson = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
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

  const heroTitle = "ぼっち・ざ・ろっく！";
  const heroYear = 2016;
  const heroOverview = '"ぼっちちゃん"こと後藤ひとりは会話の頭に必ず「あっ」って付けてしまう極度の人見知りで陰キャな少女。そんな自分でも輝けそうなバンド活動に憧れギターを始めるも友達がいないため、一人で毎日6時間ギターを弾く中学生時代を過ごすことに。上手くなったギターの演奏動画を"ギターヒーロー"としてネットに投稿したり文化祭ライブで活躍したりする妄想なんかをしていると、気づいたときにはバンドメンバーを見つけるどころか友達が一人も出来ないまま高校生になっていた……！ひきこもり一歩手前の彼女だったがある日"結束バンド"でドラムをやっている伊地知虹夏に声をかけられたことで、そんな日常がほんの少しずつ変わっていく――';
  const heroImage = 'https://media.themoviedb.org/t/p/w600_and_h900_face/se9xLGHlSqQwVgEzLw326CJjaRm.jpg';

  return (
    <div>
      <section className="hero-section">
        {heroImage && (
          <>
            <img className="hero-section-bg" src={heroImage} alt={heroTitle} />
            <div className="hero-section-gradient" />
          </>
        )}
        <div className="hero-section-content">
          <h1 className="hero-section-title">{heroTitle}</h1>
          <div className="hero-section-badges">
            <span className="hero-section-badge">{heroYear}</span>
          </div>
          {heroOverview && (
            <p className="hero-section-overview">{heroOverview}</p>
          )}
          <div className="hero-section-actions">
            <button className="hero-section-btn hero-section-btn-primary">
              <span>▶ Play</span>
            </button>
            <button className="hero-section-btn hero-section-btn-secondary">
              <span>More Info</span>
            </button>
          </div>
        </div>
      </section>
      <section className="movie-row-section">
        <h2 className="movie-row-title">
          {keyword ? `「${keyword}」の検索結果` : "人気作品"}
        </h2>
        <div className="movie-row-scroll">
          {animeList
            .filter((anime) => anime.original_name.includes(keyword))
            .filter((anime) => anime.genre_ids.includes(16))
            .map((anime) => (
            <AnimeCard anime={anime} key={anime.id} />
          ))}
        </div>
      </section>
      <div className="app-search-wrap">
        <input
          type="text"
          className="app-search"
          placeholder="アニメタイトルで検索..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App
