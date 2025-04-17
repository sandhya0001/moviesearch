import "./css/App.css";
import{Routes, Route}from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import NavBar from "./components/NavBar";
import { MoviesProvider } from "./contexts/MovieContext"; 

function App() {
   return (
    <MoviesProvider>
      <NavBar />
    <main className="main-content"> 
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
    </main>
    </MoviesProvider>
  );
}

export default App;
