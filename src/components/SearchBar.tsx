import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, TV shows..."
        className="w-64 rounded-full bg-gray-800 px-4 py-2 pl-10 pr-10 text-white placeholder-gray-400 transition-all focus:w-80 focus:outline-none focus:ring-2 focus:ring-red-600"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </form>
  );
}