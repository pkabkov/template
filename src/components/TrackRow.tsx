import React from 'react';
import '../styles/index.css';
import { formatDuration } from '../utils/helpers';
import { Track } from '../utils/types';

/**
 * Интерфейс для пропсов TrackRow.
 * @interface TrackRowProps
 * @property {Track} track - Трек.
 */
interface TrackRowProps {
  track: Track;
}

/**
 * Отображает трек в строке.
 * Включает кнопки воспроизведения (стоит заглушка) и добавления в избранное (стоит заглушка), обложку трека,
 * название трека, имя исполнителя и отформатированную длительность трека.
 *
 * @component
 * @param {TrackRowProps} props - Пропсы.
 * @param {Track} props.track - Трек.
 * @returns {React.FC<TrackRowProps>} Строка трека.
 */
const TrackRow: React.FC<TrackRowProps> = ({ track }) => {
  const imgUrl = track.image?.[1]?.["#text"] || "";

  return (
    <div className='track-row'>
      <button className='track-play' aria-label="Play"></button>
      <button className='track-fav' aria-label="Favorite"></button>
      <img className='track-cover' src={imgUrl} alt={track.name} />
      <span className='track-name'>{track.name}</span>
      <span className='track-artist'>{track.artist.name}</span>
      <span className='track-duration'>{formatDuration(track.duration)}</span>
    </div>
  );
};

export default TrackRow;