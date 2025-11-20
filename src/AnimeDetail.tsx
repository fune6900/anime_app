import { useParams } from "react-router";

function AnimeDetail() {
  const { id } = useParams();

  return (
  <div>
    <h1>Anime Detail Component</h1>
    <p>Anime ID: {id}</p>
  </div>
)};

export default AnimeDetail;
