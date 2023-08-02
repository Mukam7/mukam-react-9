import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActorMovie = () => {
  const { id } = useParams(); // URL dan kelgan id ni olish

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // API dan ma'lumotlarni olish
    fetch(`https://64c9ff90b2980cec85c2b924.mockapi.io/mukam/user/${id}/move`)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  return (
    <div className="container">
      <div className="movie-title">
        <h2>Movies of Actor {id}</h2>
      </div>
      <div className="row card-movie-row">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <div className="card-movie">
              <img
                src={movie.avatar}
                alt={movie.name}
                className="card-img-top"
              />
              <div className="card-body-movie">
                <h5 className="card-title">Movie name: {movie.name}</h5>
                <p className="card-text">Data: {movie.data}</p>
                <p className="card-text">Views: {movie.views}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorMovie;
