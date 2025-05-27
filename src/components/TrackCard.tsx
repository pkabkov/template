import React from 'react';
import '../styles/index.css';
import { Track } from '../utils/types';

/**
 * Интерфейс для пропсов TrackCard.
 * @interface TrackCardProps
 * @property {Track} track - Трек.
 * @property {string[]} tags - Теги.
 */
interface TrackCardProps {
  track: Track;
  tags: string[];
}

/**
 * Отображает карточку трека.
 * Карточка включает обложку трека, его название, имя исполнителя и список тегов.
 * Название трека и имя исполнителя являются ссылками на соответствующие страницы на Last.fm.
 * Теги также являются ссылками на страницы тегов на Last.fm.
 *
 * @component
 * @param {TrackCardProps} props - Пропсы.
 * @param {Track} props.track - Трек.
 * @param {string[]} props.tags - Массив тегов.
 * @returns {React.FC<TrackCardProps>} Карточка трека.
 */
const TrackCard: React.FC<TrackCardProps> = ({ track, tags }) => {
  const image = track.image?.find((img) => img.size === "extralarge")?.["#text"] || "";
  const trackUrl = `https://www.last.fm/music/${encodeURIComponent(track.artist.name)}/${encodeURIComponent(track.name)}`;
  const artistUrl = `https://www.last.fm/music/${encodeURIComponent(track.artist.name)}`;

  return (
    <li className='small-track-card'>
      <a href={trackUrl} target="_blank" rel="noopener noreferrer">
        <div className='small-track-image' style={{ background: `url('${image}') center/cover no-repeat` }}></div>
      </a>
      <div className='small-track-info'>
        <a className='card-name' href={trackUrl} target="_blank" rel="noopener noreferrer">
          {track.name}
        </a>
        <a href={artistUrl} target="_blank" rel="noopener noreferrer" className='middle-card-text'>
          {track.artist.name}
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

export default TrackCard;