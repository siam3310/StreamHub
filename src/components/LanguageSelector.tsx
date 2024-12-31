import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="h-5 w-5" />
        <span>{languages.find((lang) => lang.code === i18n.language)?.flag || '🌐'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 py-2 shadow-xl">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
