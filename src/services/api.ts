
const API_KEY = import.meta.env.VITE_APIKEY;
const BASE_URL = import.meta.env.VITE_BASEURL


export const fetchTrending = async (mediaType: 'movie' | 'tv' | 'all' = 'all', page = 1, language = 'en-US') => {
  const response = await fetch(
    `${BASE_URL}/trending/${mediaType}/week?api_key=${API_KEY}&page=${page}&language=${language}`
  );
  const data = await response.json();
  return data;
};

export const fetchPopular = async (mediaType: 'movie' | 'tv', page = 1, language = 'en-US') => {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/popular?api_key=${API_KEY}&page=${page}&language=${language}`
  );
  const data = await response.json();
  return data;
};

export const fetchTopRated = async (mediaType: 'movie' | 'tv', page = 1, language = 'en-US') => {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/top_rated?api_key=${API_KEY}&page=${page}&language=${language}`
  );
  const data = await response.json();
  return data;
};

export const fetchByGenre = async (mediaType: 'movie' | 'tv', genreId: number, page = 1, language = "en-US") => {
  const response = await fetch(
    `${BASE_URL}/discover/${mediaType}?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&language=${language}`
  );
  const data = await response.json();
  return data;
};

export const fetchDetails = async (mediaType: 'movie' | 'tv', id: string, language = 'en-US') => {
  const response = await fetch(
    `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&append_to_response=external_ids,similar&language=${language}`
  );
  const data = await response.json();
  return data;
};

export const fetchSeasonDetails = async (tvId: string, seasonNumber: number, language = 'en-US') => {
  const response = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=${language}`
  );
  const data = await response.json();
  return data;
};

export const fetchGenres = async (mediaType: 'movie' | 'tv', language = 'en-US') => {
  const response = await fetch(
    `${BASE_URL}/genre/${mediaType}/list?api_key=${API_KEY}&language=${language}`
  );
  const data = await response.json();
  return data.genres;
};

export const fetchAnime = async (page = 1, language = 'en-US') => {
  const response = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16&with_original_language=ja&page=${page}&language=${language}&sort_by=popularity.desc`
  );
  const data = await response.json();
  return data;
};

export const searchMedia = async (query: string, page = 1, language = 'en-US') => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=${language}`
  );
  const data = await response.json();
  return data;
};