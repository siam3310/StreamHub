import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';
import { fetchMovieDetails } from '../services/api';
import { MovieDetails as MovieDetailsType } from '../types/movie';

interface Link {
  quality: string;
  link: string;
}

interface MovieData {
  id: string;
  file_name: string;
  download_links: Link[];
  watch_links: Link[];
}

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movieLinks, setMovieLinks] = useState<MovieData | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieDetails(id);
        setMovie(data);

        // Fetch the movie links from JSON
        const response = await fetch('https://siamstv.vercel.app/tv/movies.json');
        const linksData: MovieData[] = await response.json();
        const selectedMovie = linksData.find((movieData) => movieData.id === id);
        setMovieLinks(selectedMovie || null);
      } catch (error) {
        setError('Failed to load movie details. Please try again later.');
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500">{error || 'Movie not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
            <p className="mt-2 text-xl text-gray-300">{movie.tagline}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-white">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-white">{movie.runtime} min</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-red-600 px-3 py-1 text-sm text-white"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-lg leading-relaxed text-gray-300">{movie.overview}</p>
      </div>

      {/* Download Section */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Watch & Download</h2>

        {movieLinks ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Watch Links:</h3>
              <div className="space-y-2">
                {movieLinks.watch_links.map((link) => (
                  <a
                    key={link.quality}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Watch in {link.quality}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Download Links:</h3>
              <div className="space-y-2">
                {movieLinks.download_links.map((link) => (
                  <a
                    key={link.quality}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Download in {link.quality}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg text-gray-400">No watch or download links available.</p>
        )}
      </div>
    </div>
  );
}
