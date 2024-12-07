import { useEffect, useState } from 'react';
import MediaGrid from '../components/MediaGrid';
import { fetchAnime } from '../services/api';
import Pagination from '../components/Pagination';

export default function Anime() {
  const [anime, setAnime] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const data = await fetchAnime(currentPage);
        window.scrollTo(0, 0);
        setAnime(data);
        setTotalPages(Math.min(data.total_pages || 1, 10));
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-white">Anime Series</h1>
        <MediaGrid items={anime.results} mediaType="anime"  />
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