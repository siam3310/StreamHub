import { useEffect, useState } from 'react';
import MediaScroller from '../components/MediaScroller';
import MediaGrid from '../components/MediaGrid';
import { fetchTrending, fetchPopular, fetchTopRated } from '../services/api';
import Pagination from '../components/Pagination';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const [trendingAll, setTrendingAll] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {t, i18n } = useTranslation();
console.log( process.env.VITE_BASEURL)
  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        const [trending, popular, topRated] = await Promise.all([
          fetchTrending('all', currentPage, i18n.language),
          fetchPopular('movie', currentPage),
          fetchTopRated('movie', currentPage),
        ]);

        setTrendingAll(trending.results);
        setPopularMovies(popular.results);
        setTopRatedMovies(topRated.results);
        setTotalPages(Math.min(trending.total_pages, 10));
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
    window.scrollTo(0, 0);
  }, [currentPage, i18n.language]); // Added i18n.language to the dependency array

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 pt-16">
      <MediaScroller items={trendingAll} mediaType="movie" />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">{t("Content.popularMovies")}</h2>
          <MediaGrid items={popularMovies} mediaType="movie" />
        </section>
        
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">{t("Content.topRated")}</h2>
          <MediaGrid items={topRatedMovies} mediaType="movie" />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-white">{t("Content.netflix")}</h2>
          <MediaGrid items={trendingAll.slice(0, 10)} mediaType="movie" />
        </section>

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