import React, { useEffect, useState } from "react";
import MovieBox from "./MovieBox";
import "./style.css";
import InfiniteScroll from "react-infinite-scroll-component";

let API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=1b3d5a7c4f6c4a0cbec44dad7723ea31&page=";

function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch(API_URL + page);
    const data = await response.json();
    const newMovies = [...movies, ...data.results];
    setMovies(newMovies);
    setPage(page + 1);
  };

  return (
    <div className="container">
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid">
          {movies.map((movieReq) => (
            <MovieBox key={movieReq.id} {...movieReq} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
export default Dashboard;
