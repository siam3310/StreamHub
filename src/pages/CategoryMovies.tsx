import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MediaScroller from '../components/MediaScroller'; // Horizontal scroll section
import MediaGrid from '../components/MediaGrid'; // Grid view
import Pagination from '../components/Pagination'; // Pagination component
import { fetchByGenre, fetchTrending, fetchGenres } from '../services/api';


export default function CategoryMovies() {
  const { id } = useParams<{ id: string }>();
  const { mediaType = 'movie' } = useParams();
  const [mediaItems, setMediaItems] = useState([]);
  const [trending, setTrending] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log(id)
  console.log(mediaType)
  

  const genreId =  parseInt(id || '', 10) || null;

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);

        const [trendingData, genresData] = await Promise.all([
          fetchTrending(mediaType, currentPage),
          fetchGenres(mediaType),
        ]);
        window.scrollTo(0, 0);

        setTrending(trendingData);
        setGenres(genresData);
        setTotalPages(Math.min(trendingData.total_pages || 1, 10));
      } catch (error) {
        console.error('Error fetching initial content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [mediaType, currentPage]);

  useEffect(() => {
    const loadMediaByGenre = async () => {
      try {
        setLoading(true);
        if (genreId) {
          const data = await fetchByGenre(mediaType, genreId, currentPage);
          setMediaItems(data.results || []);
          setTotalPages(Math.min(data.total_pages || 1, 10));
        } else {
          setMediaItems(trending.results);
        }
      } catch (error) {
        console.error(`Error loading ${mediaType} by genre:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadMediaByGenre();
  }, [genreId, mediaType, currentPage]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }
  

  return (
    <main className="min-h-screen bg-gray-900 pt-16">
      {/* Horizontal Scrolling Section */}
      <MediaScroller items={trending.results} mediaType={mediaType} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        

        {/* Media Grid */}
        <MediaGrid items={mediaItems} mediaType={mediaType} />

        {/* Pagination */}
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
}
