import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import {
  Container,
  CoverImage,
  InfoColumn,
  MovieName,
  MovieInfo,
  Close,
  LoadingMessage,
  ErrorMessage,
} from "./MovieInfoComponentStyles";

const MovieInfoComponent = ({ selectedMovie, onMovieSelect }) => {
  console.log("Selected Movie ID:", selectedMovie); 
  const [movieInfo, setMovieInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    console.log("Fetching movie info for ID:", selectedMovie); 
    Axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
      .then((response) => {
        console.log("Fetched movie info:", response.data); 
        if (response.data.Response === "False") {
          setError(response.data.Error);
          setMovieInfo(null);
        } else {
          setMovieInfo(response.data);
        }
      })
      .catch((error) => {
        console.error("API call failed:", error);
        setError("Failed to fetch movie information.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedMovie]);

  return (
    <Container>
      {loading ? (
        <LoadingMessage>Loading movie information...</LoadingMessage>
      ) : movieInfo ? (
        <>
          <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
          <InfoColumn>
            <MovieName>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </MovieName>
            <MovieInfo>
              IMDB Rating: <span>{movieInfo?.imdbRating}</span>
            </MovieInfo>
            <MovieInfo>
              Year: <span>{movieInfo?.Year}</span>
            </MovieInfo>
            <MovieInfo>
              Language: <span>{movieInfo?.Language}</span>
            </MovieInfo>
            <MovieInfo>
              Rated: <span>{movieInfo?.Rated}</span>
            </MovieInfo>
            <MovieInfo>
              Released: <span>{movieInfo?.Released}</span>
            </MovieInfo>
            <MovieInfo>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </MovieInfo>
            <MovieInfo>
              Genre: <span>{movieInfo?.Genre}</span>
            </MovieInfo>
            <MovieInfo>
              Director: <span>{movieInfo?.Director}</span>
            </MovieInfo>
            <MovieInfo>
              Actors: <span>{movieInfo?.Actors}</span>
            </MovieInfo>
            <MovieInfo>
              Plot: <span>{movieInfo?.Plot}</span>
            </MovieInfo>
          </InfoColumn>
          <Close onClick={onMovieSelect}>X</Close>
        </>
      ) : null}
    </Container>
  );
};

export default MovieInfoComponent;
