import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MediaGrid from '../components/MediaGrid';
import Pagination from '../components/Pagination';
import { searchMedia } from '../services/api';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const search = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await searchMedia(query, currentPage);
        setResults(data.results.filter((item: any) => 
          item.media_type === 'movie' || item.media_type === 'tv'
        ));
        setTotalPages(Math.min(data.total_pages, 500));
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [query, currentPage]);

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
        <h1 className="mb-8 text-3xl font-bold text-white">
          Search Results for "{query}"
        </h1>
        {results.length > 0 ? (
          <>
            <MediaGrid
              items={results}
              mediaType="movie"
            />
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400">No results found</p>
        )}
      </div>
    </main>
  );
}