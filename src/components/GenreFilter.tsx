interface Genre {
  id: number;
  name: string;
}

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: number | null;
  onGenreSelect: (genreId: number | null) => void;
}

export default function GenreFilter({
  genres,
  selectedGenre,
  onGenreSelect,
}: GenreFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <button
        onClick={() => onGenreSelect(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          selectedGenre === null
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreSelect(genre.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedGenre === genre.id
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}