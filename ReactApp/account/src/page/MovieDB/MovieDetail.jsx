import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../styledcomponent/Button";

const Main = styled.div`
  background-color: red;
`;

const Image = styled.img`
  border: 5px solid grey;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 20);
`;

const Overview = styled.div`
  background-color: #a05555;
  font-style: italic;
  padding: 10px;
  border-radius: 20px;
  color: white;
`;
const Title = styled.div`
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 50px;
  margin-bottom: 20px;
  color: darkmagenta;
`;
const Column = styled.div`
  width: 50%;
  height: 100%;
  float: left;
  margin: 20px auto;
`;

const ReleaseDate = styled.div`
  font-family: "Times New Roman", Times, serif;
  font: 30px bold;
  margin-top: 30px;
`;

const Rating = styled.div`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 20px;
  margin-top: 20px;
`;

const Tagline = styled.div`
  color: darkblue;
  font-style: italic;
  font-size: 20px;
  margin-top: 20px;
`;
const API_IMG = "https://image.tmdb.org/t/p/w500/";

function MovieDetail() {
  const [movie, setMovie] = useState();
  const { id } = useParams();

  const API_URL =
    "https://api.themoviedb.org/3/movie/" +
    parseInt(id) +
    "?api_key=1b3d5a7c4f6c4a0cbec44dad7723ea31";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      });
  }, []);

  function handleClick() {
    let storedFavoriteMovies = localStorage.getItem("favoriteMovies");
    storedFavoriteMovies = JSON.parse(storedFavoriteMovies);
    let updatedFavorites = [...storedFavoriteMovies, movie.id];

    updatedFavorites = new Set(updatedFavorites);
    updatedFavorites = [...updatedFavorites];

    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    console.log(localStorage.getItem("favoriteMovies"));
  }
  return (
    <Main className="container">
      {movie && (
        <>
          <Column>
            <Image src={API_IMG + movie.poster_path} />
          </Column>

          <Column>
            <Title>
              <b>{movie.original_title}</b>
            </Title>
            <Overview>
              <h5>Overview</h5>
              {movie.overview}
            </Overview>
            <ReleaseDate>
              Release Date : <b>{movie.release_date}</b>
            </ReleaseDate>
            <Rating>
              Rating : <b>{movie.vote_average}</b>
            </Rating>
            <Tagline>
              <b>"{movie.tagline}"</b>
            </Tagline>
            <ReleaseDate> Total Votes : {movie.vote_count} </ReleaseDate>
            <Button style={{ marginTop: "20px" }} onClick={handleClick}>
              Favourite
            </Button>
          </Column>
        </>
      )}
    </Main>
  );
}

export default MovieDetail;
