const API_KEY = "3a927d6f34a30dccf0ebd545b890f5e9";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json()
  return data.results
};
export const searchMovie = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie/popular?api_key=${API_KEY} &query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data.results
}; 

