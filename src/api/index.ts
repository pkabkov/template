/**
 * Ключ API от Last.fm.
 * @type {string}
 */
export const API_KEY = "339666d1cda61f9ba95a6ecd540b5484";

/**
 * Получает топ-теги для заданного артиста.
 * Возвращает массив из трех самых популярных тегов.
 *
 * @async
 * @param {string} artistName - Имя артиста.
 * @returns {Promise<string[]>} - Массив названий тегов (до 3 штук).
 */
export async function getTopTagsForArtist(artistName: string): Promise<string[]> {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=${encodeURIComponent(artistName)}&api_key=${API_KEY}&format=json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.toptags && data.toptags.tag) {
      return data.toptags.tag.slice(0, 3).map((tag: any) => tag.name);
    }
  } catch (error) {
    console.error("Ошибка при получении топ-тегов для артиста:", artistName, error);
  }
  return [];
}

/**
 * Получает список топ-артистов.
 *
 * @async
 * @returns {Promise<any[]>} Массив артистов.
 */
export async function getTopArtists(): Promise<any[]> {
  const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.artists.artist;
  } catch (error) {
    console.error("Ошибка при получении топ-артистов:", error);
    return [];
  }
}

/**
 * Получает список топ-треков.
 * Возвращает первые 24 трека.
 *
 * @async
 * @returns {Promise<any[]>} Массив объектов треков.
 */
export async function getTopTracks(): Promise<any[]> {
  // Здесь происходит какая-то аномалия: при limit=24 выдает 12 объектов, при limit=25 выдает 5 объектов, поэтому пришлось немного поизвращаться 
  const url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=26`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.tracks.track.slice(0, 24);
  } catch (error) {
    console.error("Ошибка при получении топ-треков:", error);
    return [];
  }
}

/**
 * Получает топ-теги для заданного трека.
 * Возвращает массив из трёх самых популярных тегов.
 *
 * @async
 * @param {string} artistName - Имя артиста.
 * @param {string} trackName - Название трека.
 * @returns {Promise<string[]>} Массив тегов (до 3 штук).
 */
export async function getTopTagsForTrack(artistName: string, trackName: string): Promise<string[]> {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getinfo&artist=${encodeURIComponent(artistName)}&track=${encodeURIComponent(trackName)}&api_key=${API_KEY}&format=json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.track && data.track.toptags && data.track.toptags.tag) {
      return data.track.toptags.tag.slice(0, 3).map((tag: any) => tag.name);
    }
  } catch (error) {
    console.error("Ошибка при получении тегов для трека:", trackName, error);
  }
  return [];
}

/**
 * Получает длительность трека в миллисекундах.
 * Если длительность неизвестна, возвращает строку "0".
 *
 * @async
 * @param {string} artist - Имя артиста.
 * @param {string} track - Название трека.
 * @returns {Promise<string>} Длительность трека в миллисекундах иначе "0".
 */
export async function fetchTrackInfo(artist: string, track: string): Promise<string> {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}&format=json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.track?.duration || "0";
  } catch {
    return "0";
  }
}

export async function searchArtists(query: string): Promise<any[]> {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${query}&api_key=${API_KEY}&format=json&limit=8`
  );
  const data = await res.json();
  return data.results.artistmatches.artist;
}

/**
 * Поиск альбомов по запросу.
 * Возвращает до 8 результатов.
 *
 * @async
 * @param {string} query - Поисковый запрос для альбомов.
 * @returns {Promise<any[]>} Массив альбомов.
 */
export async function searchAlbums(query: string): Promise<any[]> {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${API_KEY}&format=json&limit=8`
  );
  const data = await res.json();
  return data.results.albummatches.album;
}

/**
 * Поиск треков по запросу
 * Возвращает до 10 результатов.
 *
 * @async
 * @param {string} query - Поисковый запрос для треков.
 * @returns {Promise<any[]>} Массив треков.
 */
export async function searchTracks(query: string): Promise<any[]> {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${API_KEY}&format=json&limit=10`
  );
  const data = await res.json();
  return data.results.trackmatches.track.map((track: any) => ({
    ...track,
    artist: typeof track.artist === 'string' ? { name: track.artist, mbid: '', url: '' } : track.artist
  }));
}