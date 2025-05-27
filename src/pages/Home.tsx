import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArtistCard from '../components/ArtistCard';
import TrackCard from '../components/TrackCard';
import SectionTitle from '../components/SectionTitle';
import { getTopArtists, getTopTagsForArtist, getTopTracks, getTopTagsForTrack } from '../api';
import { Artist, Track } from '../utils/types';
import '../styles/index.css';


/**
 * Отображает главную страницу.
 *
 * @component
 * @returns {React.FC} Главная страница.
 */
const Home: React.FC = () => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistsData = await getTopArtists();
        const artistsWithTagsPromises = artistsData.map(async (artist) => {
          const tags = await getTopTagsForArtist(artist.name);
          return { ...artist, tags };
        });
        const artistsWithTags = await Promise.all(artistsWithTagsPromises);
        setTopArtists(artistsWithTags);

        const tracksData = await getTopTracks();
        const tracksWithTagsPromises = tracksData.map(async (track) => {
          const tags = await getTopTagsForTrack(track.artist.name, track.name);
          return { ...track, tags };
        });
        const tracksWithTags = await Promise.all(tracksWithTagsPromises);
        setTopTracks(tracksWithTags);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className='content'>
        <div className='page-content'>
          <div className='content-top'>
            <div className='content-top-wrapper'>
              <h1>Music</h1>
            </div>
          </div>
          <section>
            <SectionTitle titleText="Hot right now" className='section-title' />
            <ul className='more-tags-list'>
              {topArtists.map((artist, index) => (
                <ArtistCard key={index} artist={artist} tags={artist.tags || []} />
              ))}
            </ul>
          </section>
          <section>
            <SectionTitle titleText="Popular tracks" className='section-title'/>
            <ul className='small-tracks-container'>
              {topTracks.map((track, index) => (
                <TrackCard key={index} track={track} tags={track.tags || []} />
              ))}
            </ul>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;