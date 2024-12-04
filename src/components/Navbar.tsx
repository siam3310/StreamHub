import { useState, useEffect } from 'react';
import { Film, Home, Menu,  Tv, Zap, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBar';
import CategoryDropdown from './CategoryDropdown';
import LanguageSelector from './LanguageSelector';
import { fetchGenres } from '../services/api';


export default function Navbar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [languge, setLanguge] = useState("ar-AR");
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);

 

  const isActive = (path: string) => location.pathname === path;

  const lang = i18n.language;

  useEffect(() => {
    // Map i18n language to API language
    if (lang === 'en') setLanguge('en-US');
    else if (lang === 'es') setLanguge('es-ES');
    else if (lang === 'fr') setLanguge('fr-FR');
    else if (lang === 'ar') setLanguge('ar-AR');
  }, [lang]);
 // Re-run when languge, movies, or tv changes

    useEffect(() => {
      const loadGenres = async () => {
        const [movieData, tvData] = await Promise.all([
          fetchGenres('movie', languge),
          fetchGenres('tv', languge),
        ]);
        setMovies(movieData);
        setTv(tvData);
        setMovieGenres(movieData);
        setTvGenres(tvData);
      };
  
      loadGenres();
    }, [languge, movies, tv]); 
  
 
  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/movies', icon: Film, label: t('nav.movies'), categories: movieGenres, type: 'movie' },
    { path: '/series', icon: Tv, label: t('nav.series'), categories: tvGenres, type: 'tv' },
    { path: '/anime', icon: Zap, label: t('nav.anime') },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-red-600">
            StreamHub
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ path, icon: Icon, label, categories, type }) => (
              <div key={path} className="group relative">
                {categories ? (
                  <CategoryDropdown
                    title={label}
                    categories={categories}
                    mediaType={type}
                  />
                ) : (
                  <Link
                    to={path}
                    className={`flex items-center gap-2 transition-colors ${
                      isActive(path) ? 'text-red-600' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <SearchBar />
            <LanguageSelector />
          </div>

          <button
            className="md:hidden rounded-lg bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mt-4 space-y-4 md:hidden">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 transition-colors ${
                  isActive(path) ? 'text-red-600' : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            ))}
            <div className="pt-4 space-y-4">
              <SearchBar />
              <LanguageSelector />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
