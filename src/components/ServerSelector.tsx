import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ServerSelectorProps {
  mediaType: 'movie' | 'tv' | 'anime';
  mediaId: string;
  selectedSeason?: number;
  selectedEpisode?: number;
}

const servers = [
  {
    id: 'movieapi',
    name: 'MovieAPI (Ads)',
    url: 'https://moviesapi.club/',
    generateUrl: (mediaType: string, mediaId: string, season?: number, episode?: number) => {
      return mediaType === 'movie'
        ? `https://moviesapi.club/movie/${mediaId}`
        : `https://moviesapi.club/tv/${mediaId}-${season}-${episode}`;
    },
  },
  {
    id: 'embed.su',
    name: 'Embed.su',
    url: 'https://embed.su/embed/',
    generateUrl: (mediaType: string, mediaId: string, season?: number, episode?: number) => {
      return mediaType === 'movie'
        ? `https://embed.su/embed/movie/${mediaId}`
        : `https://embed.su/embed/tv/${mediaId}/${season}/${episode}`;
    },
  },
  {
    id: 'smashy',
    name: 'Smashy Stream',
    url: 'https://player.smashy.stream/',
    generateUrl: (mediaType: string, mediaId: string, season?: number, episode?: number) => {
      return mediaType === 'movie'
        ? `https://player.smashy.stream/movie/${mediaId}?playerList=D|SM`
        : `https://player.smashy.stream/tv/${mediaId}?s=${season}&e=${episode}`;
    },
  },
  {
    id: 'vidsrc.pro',
    name: 'VidSrc Pro',
    url: 'https://vidsrc.pro/embed/',
    generateUrl: (mediaType: string, mediaId: string, season?: number, episode?: number) => {
      return mediaType === 'movie'
        ? `https://vidsrc.pro/embed/movie/${mediaId}`
        : `https://vidsrc.pro/embed/tv/${mediaId}/${season}/${episode}`;
    },
  },
  {
    id: 'vidsrc.cc',
    name: 'VidSrc CC',
    url: 'https://vidsrc.cc/v2/embed/',
    generateUrl: (mediaType: string, mediaId: string, season?: number, episode?: number) => {
      return mediaType === 'movie'
        ? `https://vidsrc.cc/v2/embed/movie/${mediaId}`
        : `https://vidsrc.cc/v2/embed/tv/${mediaId}/${season}/${episode}`;
    },
  },
  {
    id: 'autoembed',
    name: 'AutoEmbed',
    url: 'https://player.autoembed.cc/embed/',
    generateUrl: (mediaType: string, mediaId: string, season?: number, episode?: number) => {
      return mediaType === 'movie'
        ? `https://player.autoembed.cc/embed/movie/${mediaId}`
        : `https://player.autoembed.cc/embed/tv/${mediaId}/${season}/${episode}`;
    },
  },
];

export default function ServerSelector({ mediaType, mediaId, selectedSeason, selectedEpisode }: ServerSelectorProps) {
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const { t } = useTranslation();

  const generateWatchLink = () => {
    return selectedServer.generateUrl(mediaType, mediaId, selectedSeason, selectedEpisode);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {servers.map((server) => (
          <button
            key={server.id}
            onClick={() => setSelectedServer(server)}
            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
              selectedServer.id === server.id
                ? 'bg-red-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {server.name}
          </button>
        ))}
      </div>
      <p className="text-sm text-center py-4 px-2 font-medium text-red-500 text-wrap">
        {t('Content.serverInfo')}
      </p>

      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          src={generateWatchLink()}
          frameBorder="0"
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={t('player.watchTitle')}
        ></iframe>
      </div>
    </div>
  );
}
