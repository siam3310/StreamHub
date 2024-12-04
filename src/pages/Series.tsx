import { useEffect, useState } from 'react';
import MediaScroller from '../components/MediaScroller';
import MediaGrid from '../components/MediaGrid';
import GenreFilter from '../components/GenreFilter';
import Pagination from '../components/Pagination';
import { fetchTrending, fetchByGenre, fetchGenres } from '../services/api';

export default function Series() {
  const [trending, setTrending] = useState({ results: [] });
  const [series, setSeries] = useState({ results: [] });
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const [trendingData, genresData] = await Promise.all([
          fetchTrending('tv', currentPage),
          fetchGenres('tv'),
        ]);
        setTrending(trendingData);
        setGenres(genresData);
        setSeries(trendingData);
        setTotalPages(Math.min(trendingData.total_pages || 1, 10));
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentPage]);

  useEffect(() => {
    const loadSeriesByGenre = async () => {
      if (selectedGenre) {
        try {
          setLoading(true);
          const data = await fetchByGenre('tv', selectedGenre, currentPage);
          setSeries(data);
          setTotalPages(Math.min(data.total_pages || 1, 10));
        } catch (error) {
          console.error('Error loading series by genre:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSeries(trending);
      }
    };

    loadSeriesByGenre();
  }, [selectedGenre, trending, currentPage]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 pt-16">
      <MediaScroller items={trending.results} mediaType="tv" />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onGenreSelect={setSelectedGenre}
        />
        <MediaGrid items={series.results} mediaType="tv" />
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