import React, { useEffect, useState } from "react";
import MovieBox from "./MovieBox";
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";

function FavouriteMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    let storedFavoriteMovies = localStorage.getItem("favoriteMovies");
    storedFavoriteMovies = JSON.parse(storedFavoriteMovies);
    console.log(storedFavoriteMovies);

    storedFavoriteMovies.map(async (item) => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          item +
          "?api_key=1b3d5a7c4f6c4a0cbec44dad7723ea31"
      );
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, data]);
    });

    movies.sort();
  };

  return (
    <div className="container">
      <div className="grid">
        {movies.map((movieReq) => (
          <MovieBox key={movieReq.id} {...movieReq} />
        ))}
      </div>
    </div>
  );
}
export default FavouriteMovies;
