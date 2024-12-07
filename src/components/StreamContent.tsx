import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface StreamContentProps {
  mediaType: 'movie' | 'tv';
}

const servers = [
  {
    name: 'VidSrc',
    getUrl: (id: string, season?: number, episode?: number) => {
      if (season && episode) {
        return `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`;
      }
      return `https://vidsrc.to/embed/movie/${id}`;
    },
  },
  {
    name: 'VidSrc.me',
    getUrl: (id: string, season?: number, episode?: number) => {
      if (season && episode) {
        return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      }
      return `https://vidsrc.me/embed/movie?tmdb=${id}`;
    },
  },
  {
    name: 'SuperEmbed',
    getUrl: (id: string, season?: number, episode?: number) => {
      const baseUrl = 'https://multiembed.mov/directstream.php';
      if (season && episode) {
        return `${baseUrl}?video_id=${id}&tmdb=1&season=${season}&episode=${episode}`;
      }
      return `${baseUrl}?video_id=${id}&tmdb=1`;
    },
  },
];

export default function StreamContent({ mediaType }: StreamContentProps) {
  const { id, season, episode } = useParams();
  const location = useLocation();
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedServer]);

  const createIframe = () => {
    const url = selectedServer.getUrl(
      id!,
      season ? parseInt(season) : undefined,
      episode ? parseInt(episode) : undefined
    );

    return (
      <iframe
        src={url}
        width="100%"
        height="100%"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="rounded-lg"
        name="iframe"
        id='iframe'
      />
    );
  };

  return (
    <div className="mx-auto max-w-7xl p-4">
      <div className="mb-4 flex gap-2">
        {servers.map((server) => (
          <button
            key={server.name}
            onClick={() => setSelectedServer(server)}
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              selectedServer.name === server.name
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {server.name}
          </button>
        ))}
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
        {createIframe()}
      </div>
    </div>
  );
}