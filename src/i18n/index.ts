import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    resources: {
      en: {
        translation: {
          nav: {
            home: 'Home',
            movies: 'Movies',
            series: 'TV Series',
            anime: 'Anime',
            search: 'Search',
          },
          categories: {
            all: 'All',
            action: 'Action',
            comedy: 'Comedy',
            drama: 'Drama',
            horror: 'Horror',
            romance: 'Romance',
            scifi: 'Sci-Fi',
          },
          Content: {
            watchTitle: 'Watch Now',
            releaseDate: 'Release Date',
            stautsmovies: ['Returning Series', 'Returning Series', 'Ended', 'Released'],
            Season: 'Season ',
            originalLanguage: 'Original Language',
            status: 'Status',
            overview: 'Overview',
            episodes: 'Episodes',
            similarShows: 'Similar Shows',
            viewDetails: 'View Details',
            popularMovies: 'Popular Movies',
            topRated: 'Top Rated Movies',
            netflix: 'Netflix Top 10',
            serchMoviesTvs: 'Search a movie or a TV show',
            shoseEpisodes: 'Choose Episodes',
            shoseServer: 'Choose Server',
            serverInfo: 'If the server does not work for you, switch to another and make sure to enable the subtitle from the video settings.',
            langugeNotSupported: 'The movie overview is not available in your language.',
          },
        },
      },
      bn: {
        translation: {
          nav: {
            home: 'হোম',
            movies: 'মুভি',
            series: 'টিভি সিরিজ',
            anime: 'এনিমে',
            search: 'অনুসন্ধান',
          },
          categories: {
            all: 'সব',
            action: 'অ্যাকশন',
            comedy: 'কমেডি',
            drama: 'ড্রামা',
            horror: 'হরর',
            romance: 'রোমান্স',
            scifi: 'বিজ্ঞান কল্পকাহিনী',
          },
          Content: {
            watchTitle: 'দেখুন',
            releaseDate: 'মুক্তির তারিখ',
            stautsmovies: ['চলমান সিরিজ', 'চলমান সিরিজ', 'শেষ', 'মুক্তি পেয়েছে'],
            Season: 'মৌসুম ',
            originalLanguage: 'মূল ভাষা',
            status: 'অবস্থা',
            overview: 'সারসংক্ষেপ',
            episodes: 'পর্ব',
            similarShows: 'সদৃশ শো',
            viewDetails: 'বিস্তারিত দেখুন',
            popularMovies: 'জনপ্রিয় মুভি',
            topRated: 'শীর্ষ রেটেড মুভি',
            netflix: 'নেটফ্লিক্স টপ ১০',
            serchMoviesTvs: 'একটি মুভি বা টিভি শো অনুসন্ধান করুন',
            shoseEpisodes: 'পর্ব নির্বাচন করুন',
            shoseServer: 'সার্ভার নির্বাচন করুন',
            serverInfo: 'যদি সার্ভার কাজ না করে, অন্যটিতে পরিবর্তন করুন এবং ভিডিও সেটিং থেকে সাবটাইটেল চালু করুন।',
            langugeNotSupported: 'চলচ্চিত্রের সারসংক্ষেপ আপনার ভাষায় উপলব্ধ নয়।',
          },
        },
      },
    },
  });

export default i18n;
