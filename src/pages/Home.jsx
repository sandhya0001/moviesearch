import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCards";
import "../css/Home.css";
import { searchMovie, getPopularMovies } from "../services/api";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovie = await getPopularMovies();
        setMovies(popularMovie);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchMovie(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
     
  };

  return (
    <div className="Home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies && Array.isArray(movies) ? (
            movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)
          ) : (
            <p>No movies available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
