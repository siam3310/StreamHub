import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900 transition-all hover:scale-105">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="h-[400px] w-full object-cover transition-all group-hover:opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all group-hover:opacity-100">
          <button className="rounded-full bg-red-600 p-4 text-white">
            <Play className="h-6 w-6" />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
          <h3 className="text-xl font-bold text-white">{movie.title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-300">
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-sm text-gray-400">
              ({new Date(movie.release_date).getFullYear()})
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}