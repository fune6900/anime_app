import { Link } from "react-router";
import "./App.css";

type Props = {
  anime: Anime;
};

type Anime = {
  id: string;
  original_name: string;
  poster_path: string;
};

function AnimeCard(props: Props) {
  const { anime } = props;
  return (
    <Link to={`/animes/${anime.id}`} key={anime.id} className="movie-card">
      <div className="movie-card__imgwrap">
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${anime.poster_path}`}
          alt={anime.original_name}
          className="movie-card__image"
        />
        <div className="movie-card__overlay">
          <h3 className="movie-card__title">{anime.original_name}</h3>
        </div>
      </div>
    </Link>
  )
}

export default AnimeCard
