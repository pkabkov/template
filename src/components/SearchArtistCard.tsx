import React from 'react';
import '../styles/index.css';

/**
 * Интерфейс, описывающий структуру артиста.
 * @interface Artist
 * @property {string} name - Имя артиста.
 * @property {Array<{ '#text': string; size: string; }>} image - Массив объектов изображений артиста разных размеров.
 * Свойство '#text' содержит URL изображения.
 * @property {string} listeners - Количество слушателей артиста.
 */
interface Artist {
  name: string;
  image: Array<{ '#text': string; size: string; }>;
  listeners: string;
}

/**
 * Интерфейс для пропсов SearchArtistCard.
 * @interface SearchArtistCardProps
 * @property {Artist} artist - Объект артиста, содержащий информацию для отображения.
 */
interface SearchArtistCardProps {
  artist: Artist;
}

/**
 * Отображает карточку артиста.
 * Карточка включает обложку/изображение артиста, его имя и количество слушателей.
 * Имя артиста является ссылкой на его страницу на Last.fm.
 *
 * @component
 * @param {SearchArtistCardProps} props - Пропсы.
 * @param {Artist} props.artist - Артист.
 * @returns {React.FC<SearchArtistCardProps>} Карточка артиста.
 */
const SearchArtistCard: React.FC<SearchArtistCardProps> = ({ artist }) => {
  const imageUrl = artist.image?.[2]?.['#text'] || ''; 
  const artistUrl = `https://www.last.fm/music/${encodeURIComponent(artist.name)}`;
  
  const formattedListeners = parseInt(artist.listeners).toLocaleString();

  return (
    <div className="main-section-card">
      <div 
        className="main-section-bg" 
        style={{ backgroundImage: `url('${imageUrl}') center/cover no-repeat` }}
      >
        <a href={artistUrl} target="_blank" rel="noopener noreferrer" className="artist-name">
          {artist.name}
        </a>
        <span className="artist-listeners">
          {formattedListeners} listeners
        </span>
      </div>
    </div>
  );
};

export default SearchArtistCard;