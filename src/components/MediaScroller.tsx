
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface Media {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  overview: string;
}

interface MediaScrollerProps {
  items: Media[];
  mediaType: 'movie' | 'tv';
}

export default function MediaScroller({ items, mediaType }: MediaScrollerProps) {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 5000 }}
      className="h-[80vh] w-full pt-"
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="relative h-full w-full">
            <img
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt={item.title || item.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="mx-auto max-w-7xl">
                <h2 className="text-4xl font-bold text-white">
                  {item.title || item.name}
                </h2>
                <p className="mt-2 max-w-2xl text-gray-300">{item.overview}</p>
                <Link
                  to={`/${mediaType}/${item.id}`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <Play className="h-5 w-5" />
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}