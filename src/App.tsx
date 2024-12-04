import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Series from './pages/Series';
import Anime from './pages/Anime';
import Search from './pages/Search';
import MediaDetails from './pages/MediaDetails';
import StreamContent from './components/StreamContent';
import './i18n';
import CategoryMovies from './pages/CategoryMovies';
import AdBlocker from './components/ads';
export default function App() {
  return (
    
    <Router>
      <AdBlocker></AdBlocker>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/:mediaType/categories/:id" element={<CategoryMovies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/anime" element={<Anime />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MediaDetails mediaType="movie" />} />
            <Route path="/tv/:id" element={<MediaDetails mediaType="tv" />} />
            <Route path="/stream/movie/:id" element={<StreamContent mediaType="movie" />} />
            <Route path="/stream/tv/:id/season/:season/episode/:episode" element={<StreamContent mediaType="tv" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}