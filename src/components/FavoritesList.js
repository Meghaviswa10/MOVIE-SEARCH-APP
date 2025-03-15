import React from 'react';
import { getFavoriteMovies, removeFavoriteMovie } from '../favoriteMovies';

const FavoritesList = () => {
  const favorites = getFavoriteMovies();

  const handleRemoveFavorite = (imdbID) => {
    removeFavoriteMovie(imdbID);
  };

  return (
    <div>
      <h2>Your Favorite Movies</h2>
      {favorites.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <ul>
          {favorites.map(movie => (
            <li key={movie.imdbID}>
              {movie.Title} ({movie.Year})
              <button onClick={() => handleRemoveFavorite(movie.imdbID)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesList;
