import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ServerSelectorProps {
  mediaType: 'movie' | 'tv';
  mediaId: string;
  selectedSeason?: number;
  selectedEpisode?: number;
}

const servers = [
  { id: 'vidsrcme', name: 'server 1', url: 'https://vidsrc.icu/embed' },
  { id: 'superembed', name: 'server 2', url: 'https://multiembed.mov/directstream.php' },
  //{ id: 'vidsrc', name: 'server 3', url: 'www.vidbinge.com' },

];

export default function ServerSelector({ mediaType, mediaId, selectedSeason, selectedEpisode }: ServerSelectorProps) {
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const { t } = useTranslation();


  const generateWatchLink = () => {
    switch (selectedServer.id) {
      case 'vidsrcme':
        return mediaType === 'movie'
          ? `${selectedServer.url}/movie/${mediaId}`
          : `${selectedServer.url}/tv/${mediaId}/${selectedSeason}/${selectedEpisode}`;
      case 'vidsrc':
        return mediaType === 'movie'
          ? `${selectedServer.url}/movie/${mediaId}`
          : `${selectedServer.url}/tv/${mediaId}/${selectedSeason}/${selectedEpisode}`;
     
      case 'superembed':
        return mediaType === 'movie'
          ? `${selectedServer.url}?video_id=${mediaId}&tmdb=1`
          : `${selectedServer.url}?video_id=${mediaId}&tmdb=1&season=${selectedSeason}&episode=${selectedEpisode}`;
      default:
        return '';
    }
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
      <p className='text-sm text-center py-4 px-2 font-medium text-red-500 text-wrap'>{t("Content.serverInfo")}</p>
      
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