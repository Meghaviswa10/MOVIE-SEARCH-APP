import React from "react";
import styled from "styled-components";
import MovieComponent from "./MovieComponent";

const FavoritesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const FavoritesTitle = styled.h2`
  color: white;
`;

const FavoriteMovies = ({ movies }) => {
  return (
    <FavoritesContainer>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieComponent
            key={movie.imdbID}
            movie={movie}
            onMovieSelect={() => {}}
          />
        ))
      ) : null
      }
    </FavoritesContainer>
  );
};

export default FavoriteMovies;
