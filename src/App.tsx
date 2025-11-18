import { useEffect, useState } from 'react';
import './App.css'

type Anime = {
  id: number;
  title: string;
  images?: Images; 
  media_text: string;
  season_name_text: string;  
  official_site_url: string;
  twitter_username: string;
};

type Images = {
  facebook?: {
    og_image_url?: string;
  };
  recommended_url?: string;
  twitter?: {
    bigger_avatar_url?: string;
    image_url?: string;
    mini_avatar_url?: string;
    normal_avatar_url?: string;
    original_avatar_url?: string;
  };
};

type Work = {
  images?: Images;
};

type AnimeJson = {
  episodes_count: number;
  id: number;
  images: Images;
  mal_anime_id: string;
  media: string;
  media_text: string;
  no_episodes: boolean;
  official_site_url: string;
  released_on: string;
  released_on_about: string;
  reviews_count: number;
  season_name: string;
  season_name_text: string;
  syobocal_tid: string;
  title: string;
  title_en: string;
  title_kana: string;
  twitter_hashtag: string;
  twitter_username: string;
  watchers_count: number;
  wikipedia_url: string;
};

function App() {
  const apiKey = import.meta.env.VITE_ANNICT_API_KEY;
  const [keyword, setKeyword] = useState("");
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  const fetchAnimeList = async () => {
    const response = await fetch(
      "https://api.annict.com/v1/works?filter_title=お兄ちゃんはおしまい",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_ANNICT_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    setAnimeList(data.works.map((work: AnimeJson) => ({
      id: work.id,
      title: work.title,
      images: work.images,
      media_text: work.media_text,
      season_name_text: work.season_name_text,
      official_site_url: work.official_site_url,
      twitter_username: work.twitter_username,
    })));
    console.log(data.works);
  };

  useEffect(() => { 
    fetchAnimeList();
  }, []);

  // フェイルオーバー（fallback）画像取得関数
  const getAnimeImage = (work: Work) => {
    const images = work.images || {};
  
    return (
      images.facebook?.og_image_url ||
      images.twitter?.image_url ||
      images.recommended_url ||
      "/no-image.png"
    );
  };

  return (
    <div>
      <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder="タイトルで検索" />
      <p>検索キーワード: {keyword}</p>
      {animeList.filter((anime) => anime.title.includes(keyword)).map((anime) => (
        <div key={anime.id}>
          <h2>{anime.title}</h2>
          <img src={getAnimeImage(anime)} alt={anime.title} />
          <p>{anime.media_text}</p>
          <p>{anime.season_name_text}</p>
          <a href={anime.official_site_url} target="_blank" rel="noopener noreferrer">公式サイト</a><br />
          <a href={anime.twitter_username ? `https://twitter.com/${anime.twitter_username}` : '#'} target="_blank" rel="noopener noreferrer">X</a>
        </div>
      ))}
    </div>
  )
}

export default App
