import { Link } from 'react-router-dom';
import { Play, Star } from 'lucide-react';

interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
  media_type?: string;
}

interface MediaGridProps {
  items: Media[];
  mediaType: 'movie' | 'tv'| "anime";
}

export default function MediaGrid({ items, mediaType }: MediaGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <div key={item.id} className="group relative overflow-hidden rounded-lg">
          <Link 
            to={`/${item.media_type || mediaType}/${item.id}/${ mediaType==="anime"?"true":""}`}
            state={{ media: item }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="h-[400px] w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="h-16 w-16 text-white" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-4">
              <h3 className="text-lg font-semibold text-white">
                {item.title || item.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-white">
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}