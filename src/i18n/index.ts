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
            releaseDate: 'releaseDate',
            stautsmovies: ['Returning Series', 'Returning Series', 'Ended', 'Released'],
            Season: 'Season ',
            originalLanguage: 'OriginalLanguage',
            status: 'status',
            overview: 'overview',
            episodes: 'episodes',
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
      fr: {
        translation: {
          nav: {
            home: 'Accueil',
            movies: 'Films',
            series: 'Séries TV',
            anime: 'Anime',
            search: 'Rechercher',
          },
          categories: {
            all: 'Tout',
            action: 'Action',
            comedy: 'Comédie',
            drama: 'Drame',
            horror: 'Horreur',
            romance: 'Romance',
            scifi: 'Science-Fiction',
          },
          Content: {
            watchTitle: 'Regarder Maintenant',
            releaseDate: 'Date de sortie',
            stautsmovies: ['Série en cours', 'Série en cours', 'Terminée', 'Sortie'],
            Season: 'Saison ',
            originalLanguage: 'Langue originale',
            status: 'Statut',
            overview: 'Aperçu',
            episodes: 'Épisodes',
            similarShows: 'Émissions Similaires',
            viewDetails: 'Voir les Détails',
            popularMovies: 'Films Populaires',
            topRated: 'Films les Mieux Notés',
            netflix: 'Top 10 Netflix',
            serchMoviesTvs: 'Recherchez un film ou une série',
            shoseEpisodes: 'Choisissez des Épisodes',
            shoseServer: 'Choisissez un Serveur',
            serverInfo: 'Si le serveur ne fonctionne pas, passez à un autre et assurez-vous d’activer les sous-titres dans les paramètres de la vidéo.',
            langugeNotSupported: 'Le résumé du film n’est pas disponible dans votre langue.',
          },
        },
      },
      ar: {
        translation: {
          nav: {
            home: 'الرئيسية',
            movies: 'أفلام',
            series: 'مسلسلات',
            anime: 'أنمي',
            search: 'بحث',
          },
          categories: {
            all: 'الكل',
            action: 'أكشن',
            comedy: 'كوميديا',
            drama: 'دراما',
            horror: 'رعب',
            romance: 'رومانسي',
            scifi: 'خيال علمي',
          },
          Content: {
            watchTitle: 'شاهد الآن',
            releaseDate: 'تاريخ الإصدار',
            stautsmovies: ['سلسلة مستمرة', 'سلسلة مستمرة', 'انتهت', 'تم الإصدار'],
            Season: 'الموسم ',
            originalLanguage: 'اللغة الأصلية',
            status: 'الحالة',
            overview: 'نظرة عامة',
            episodes: 'الحلقات',
            similarShows: 'عروض مشابهة',
            viewDetails: 'عرض التفاصيل',
            popularMovies: 'أفلام شائعة',
            topRated: 'أفضل الأفلام تقييماً',
            netflix: 'أفضل 10 على نتفليكس',
            serchMoviesTvs: 'ابحث عن فيلم أو برنامج تلفزيوني',
            shoseEpisodes: 'اختر الحلقات',
            shoseServer: 'اختر الخادم',
            serverInfo: 'إذا لم يعمل الخادم، قم بالتبديل إلى آخر وتأكد من تمكين الترجمة من إعدادات الفيديو.',
            langugeNotSupported: 'ملخص الفيلم غير متوفر بلغتك.',
          },
        },
      },
      es: {
        translation: {
          nav: {
            home: 'Inicio',
            movies: 'Películas',
            series: 'Series',
            anime: 'Anime',
            search: 'Buscar',
          },
          categories: {
            all: 'Todo',
            action: 'Acción',
            comedy: 'Comedia',
            drama: 'Drama',
            horror: 'Terror',
            romance: 'Romance',
            scifi: 'Ciencia Ficción',
          },
          Content: {
            watchTitle: 'Ver Ahora',
            releaseDate: 'Fecha de lanzamiento',
            stautsmovies: ['Serie en emisión', 'Serie en emisión', 'Terminada', 'Lanzada'],
            Season: 'Temporada ',
            originalLanguage: 'Idioma original',
            status: 'Estado',
            overview: 'Resumen',
            episodes: 'Episodios',
            similarShows: 'Programas Similares',
            viewDetails: 'Ver Detalles',
            popularMovies: 'Películas Populares',
            topRated: 'Películas Mejor Valoradas',
            netflix: 'Top 10 de Netflix',
            serchMoviesTvs: 'Buscar una película o un programa de TV',
            shoseEpisodes: 'Elegir Episodios',
            shoseServer: 'Elegir Servidor',
            serverInfo: 'Si el servidor no funciona, cambie a otro y asegúrese de habilitar los subtítulos en la configuración del video.',
            langugeNotSupported: 'El resumen de la película no está disponible en tu idioma.',
          },
        },
      },
    },
  });

export default i18n;
