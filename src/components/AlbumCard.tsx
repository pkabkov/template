import React from 'react';
import '../styles/index.css';

/**
 * Интерфейс для пропсов AlbumCard.
 * @interface AlbumCardProps
 * @property {object} album - Альбом.
 * @property {string} album.name - Название альбома.
 * @property {string} album.artist - Имя исполнителя.
 * @property {{ '#text': string; size: string }[]} album.image - Массив изображений альбома разных размеров.
 * Свойство '#text' содержит URL изображения.
 */
interface AlbumCardProps {
  album: {
    name: string;
    artist: string;
    image: { '#text': string; size: string }[];
  };
}

/**
 * Компонент AlbumCard отображает карточку альбома с его обложкой, названием и именем исполнителя.
 * При клике на название альбома или имя исполнителя открывается соответствующая страница на Last.fm.
 *
 * @component
 * @param {AlbumCardProps} props - Пропсы.
 * @param {object} props.album - Альбом.
 * @returns {React.FC<AlbumCardProps>} Карточка альбома.
 */
const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  const imgUrl = album.image?.[2]?.["#text"] || "";
  const albumUrl = `https://www.last.fm/music/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.name)}`;
  const artistUrl = `https://www.last.fm/music/${encodeURIComponent(album.artist)}`;

  return (
    <div className='main-section-card'>
      <div className='main-section-bg' style={{ background: `url('${imgUrl}') center/cover no-repeat` }}>
        <a href={albumUrl} target="_blank" rel="noopener noreferrer" className='artist-name'>
          {album.name}
        </a>
        <a href={artistUrl} target="_blank" rel="noopener noreferrer" className='artist-listeners'>
          {album.artist}
        </a>
      </div>
    </div>
  );
};

export default AlbumCard;