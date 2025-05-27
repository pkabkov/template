import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { searchArtists, searchAlbums, searchTracks, fetchTrackInfo } from '../api';
import { Artist, Album, Track } from '../utils/types';

/**
 * Интерфейс, описывающий структуру данных, возвращаемых хуком `useSearch`.
 * @interface SearchResults
 * @property {Artist[]} artists - Массив объектов артистов, найденных по запросу.
 * @property {Album[]} albums - Массив объектов альбомов, найденных по запросу.
 * @property {Track[]} tracks - Массив объектов треков, найденных по запросу.
 * @property {boolean} loading - Флаг, указывающий на состояние загрузки данных. True, если данные загружаются.
 * @property {string | null} error - Сообщение об ошибке, если произошла ошибка при загрузке данных, иначе `null`.
 */
interface SearchResults {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  loading: boolean;
  error: string | null;
}

/**
 * Хук `useSearch` предоставляет функциональность поиска по артистам, альбомам и трекам
 * на основе заданного поискового запроса.
 *
 * Запрос может быть передан как `initialQuery` или извлечен из параметров URL.
 *
 * @function
 * @param {string} [initialQuery] - Необязательный начальный поисковый запрос.
 * Если не указан, хук попытается получить запрос из параметра 'q' в URL.
 * @returns {SearchResults} Результаты поиска (артистов, альбомов, треков),
 * статус загрузки и информацию об ошибке.
 */
export const useSearch = (initialQuery?: string): SearchResults => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [tracks, setTracks] = useState<Track[]>([] as Track[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const location = useLocation();

  const query = initialQuery || new URLSearchParams(location.search).get('q') || '';

  const performSearch = useCallback(async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const encodedQuery = encodeURIComponent(searchQuery.toLowerCase());
      const [artistsData, albumsData, tracksData] = await Promise.all([
        searchArtists(encodedQuery),
        searchAlbums(encodedQuery),
        searchTracks(encodedQuery),
      ]);

      const tracksWithDuration = await Promise.all(
        tracksData.map(async (track: any) => {
          const duration = await fetchTrackInfo(track.artist.name, track.name);
          return { ...track, duration };
        })
      );

      setArtists(artistsData);
      setAlbums(albumsData);
      setTracks(tracksWithDuration);
    } catch (err) {
      setError('Failed to fetch search results.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setLoading(false);
      setArtists([]);
      setAlbums([]);
      setTracks([]);
    }
  }, [query, performSearch]);

  return { artists, albums, tracks, loading, error };
};