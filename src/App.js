import React, { useState, useEffect } from "react";
import { getFavoriteMovies } from './favoriteMovies'; 
import FavoriteMovies from "./components/FavoriteMovies"; 
import styled from "styled-components";
import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent"; 

export const API_KEY = "2b683683";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(12, 12, 12); 
  min-height: 100vh;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 30px; 
  color: #ffffff; 
`;

const Header = styled.div`
  background-color: rgb(1, 1, 1); 
  color: #ffffff; 
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 20px; 
  margin-left: 20px;
  width: 50%;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px; 
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 100px; 
  opacity: 70%; 
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [timeoutId, updateTimeoutId] = useState();
  const [selectedMovie, setSelectedMovie] = useState(null); 

  const [favoriteMovies, setFavoriteMovies] = useState([]); 

  const fetchMovies = async (query) => {
    console.log("Fetching movies for query:", query); 
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();
      console.log("API Response:", data); 
      const moviesData = data.Search || [];
      console.log("Fetched Movies Data:", moviesData); 

      const detailedMovies = await Promise.all(moviesData.map(async (movie) => {
        const detailResponse = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
        const detailData = await detailResponse.json();
        return { ...movie, imdbRating: detailData.imdbRating }; 
      }));

      setMovies(detailedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
    }
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchMovies(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  const fetchFavoriteMovies = () => { 
    const favorites = getFavoriteMovies();
    setFavoriteMovies(favorites);
  };

  useEffect(() => {
    fetchMovies("movie"); 
  }, []);

  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/react-movie-app/movie-icon.svg" />
          Movie Search App
        </AppName>
        <SearchBox>
          <SearchIcon src="/react-movie-app/search-icon.svg" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && ( 
        <MovieInfoComponent
          selectedMovie={selectedMovie}
          onMovieSelect={() => {
            console.log("Deselecting Movie"); 
            setSelectedMovie(null);
          }}
        />
      )}
      <FavoriteMovies movies={favoriteMovies} /> {/* Display favorite movies */}
      <MovieListContainer>
        {movies.length > 0 ? (
          movies.map((movie, index) => ( 
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={() => {
                console.log("Selected Movie ID:", movie.imdbID); 
                setSelectedMovie(movie.imdbID);
              }} 
            />
          ))
        ) : null}
      </MovieListContainer>
    </Container>
  );
}

export default App;
