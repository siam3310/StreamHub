import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';



interface Category {
  id: number;
  name: string;
}

interface CategoryDropdownProps {
  title: string;
  categories: Category[];
  mediaType: string;
}

export default function CategoryDropdown({ title, categories, mediaType }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
 

  return (
    <div 
      className="relative" 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 text-gray-300 hover:text-white">
          <Link
            to={`/${mediaType==="movie"?"movies":"series"}`}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
           <span>{title}</span>
          </Link>
        <ChevronDown className="h-4 w-4" />
      </button>
      {isOpen && (
        <div className="absolute left-0 top-5 z-50 mt-2 w-48 rounded-lg bg-gray-800 py-2 shadow-xl">
        
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/${mediaType}/categories/${category.id}`}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}