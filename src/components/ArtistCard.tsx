import React from 'react';
import '../styles/index.css';

/**
 * Интерфейс для пропсов ArtistCard.
 * @interface ArtistCardProps
 * @property {object} artist - Артист.
 * @property {string} artist.name - Имя артиста.
 * @property {{ '#text': string; size: string }[]} artist.image - Массив изображений артиста разных размеров.
 * Свойство '#text' содержит URL изображения.
 * @property {string} artist.listeners - Количество слушателей артиста.
 * @property {string[]} tags - Массив тегов.
 */
interface ArtistCardProps {
  artist: {
    name: string;
    image: { '#text': string; size: string }[];
    listeners: string;
  };
  tags: string[];
}

/**
 * Компонент ArtistCard отображает карточку артиста с его изображением, именем и списком тегов.
 * При клике на имя артиста или его изображение открывается страница артиста на Last.fm.
 * Теги также являются ссылками на соответствующие страницы тегов на Last.fm.
 *
 * @component
 * @param {ArtistCardProps} props - Пропсы.
 * @param {object} props.artist - Артист.
 * @param {string[]} props.tags - Массив тегов.
 * @returns {React.FC<ArtistCardProps>} Карточка артиста.
 */
const ArtistCard: React.FC<ArtistCardProps> = ({ artist, tags }) => {
  const imgUrl = artist.image?.[2]?.["#text"] || "";
  const artistUrl = `https://www.last.fm/music/${encodeURIComponent(artist.name)}`;

  return (
    <li className='card'>
      <a href={artistUrl} target="_blank" rel="noopener noreferrer">
        <div className='medium-circle-tag' style={{ background: `url('${imgUrl}') center/cover no-repeat` }}></div>
      </a>
      <div className='card-info'>
        <a className='card-name' href={artistUrl} target="_blank" rel="noopener noreferrer">
          {artist.name}
        </a>
        <div className='card-bottom-tags-list'>
          {tags.map((tag, i) => (
            <a key={i} href={`https://www.last.fm/tag/${encodeURIComponent(tag)}`} target="_blank" rel="noopener noreferrer" className='card-bottom'>
              {tag}
            </a>
          ))}
        </div>
      </div>
    </li>
  );
};

export default ArtistCard;