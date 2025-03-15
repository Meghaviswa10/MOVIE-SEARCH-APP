import React from "react";
import { addFavoriteMovie, getFavoriteMovies } from '../favoriteMovies';
import styled from "styled-components";

const MovieContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;

const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;

const MovieName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const MovieInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const MovieComponent = ({ movie, onMovieSelect }) => {
  const { Title, Year, imdbID, imdbRating, Poster } = movie;
  const favorites = getFavoriteMovies();
  const isFavorite = favorites.some(fav => fav.imdbID === imdbID);

const handleAddToFavorites = () => {
    console.log("Adding to favorites:", movie); 
    addFavoriteMovie(movie);
};


  const handleMovieSelect = () => {
    console.log("Selected Movie ID:", imdbID); 
    onMovieSelect(imdbID);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MovieContainer onClick={handleMovieSelect}>
      <CoverImage src={Poster} alt={Title} />
      <MovieName>{Title}</MovieName>
      <InfoColumn>
        <MovieInfo>Year: {Year}</MovieInfo>
        <MovieInfo>IMDb Rating: {imdbRating}</MovieInfo>
      </InfoColumn>
<button onClick={handleAddToFavorites}>
  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
</button>

    </MovieContainer>
  );
};

export default MovieComponent;
