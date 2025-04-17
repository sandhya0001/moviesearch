import { createContext, useContext, useState, useEffect } from "react";

const MoviesContext = createContext();

export const useMovieContext = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const values = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
  return (
    <MoviesContext.Provider value={values}>{children}</MoviesContext.Provider>
  );
};
