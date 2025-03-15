const FAVORITES_KEY = 'favoriteMovies';

export const getFavoriteMovies = () => {
const favorites = localStorage.getItem(FAVORITES_KEY);
console.log("Current favorites:", favorites); 
    return favorites ? JSON.parse(favorites) : [];
};

export const addFavoriteMovie = (movie) => {
const favorites = getFavoriteMovies();
console.log("Current favorites:", favorites); 

if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
    console.log("Adding movie to favorites:", movie);   

    console.log("Adding movie to favorites:", movie); 
        favorites.push(movie);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
};

export const removeFavoriteMovie = (imdbID) => {
    const favorites = getFavoriteMovies().filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};
