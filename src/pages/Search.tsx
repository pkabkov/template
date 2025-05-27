import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AlbumCard from '../components/AlbumCard';
import TrackRow from '../components/TrackRow';
import SectionTitle from '../components/SectionTitle';
import SearchBar from '../components/SearchBar';
import SearchArtistCard from '../components/SearchArtistCard';
import { useSearch } from '../hooks/useSearch';
import '../styles/index.css';


/**
 * Отображает страницу поиска
 * 
 * @component
 * @returns {React.FC} Страница поиска.
 */
const Search: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';

  const [activeTab, setActiveTab] = useState('Top Results');
  const [currentSearchQuery, setCurrentSearchQuery] = useState(initialQuery);

  const { artists, albums, tracks, loading, error } = useSearch(currentSearchQuery);

  useEffect(() => {
    setCurrentSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchSubmit = (query: string) => {
    history.push(`/search?q=${encodeURIComponent(query)}`);
    setCurrentSearchQuery(query);
  };

  const handleClearSearch = () => {
    history.push('/search');
    setCurrentSearchQuery('');
  };

  if (loading) {
    return (
      <>
        <Header initialQuery={currentSearchQuery} />
        <div className='search-results-container'>
          <h1 className='search-title'>
            Search results for <span className='search-query'>“{currentSearchQuery}”</span>
          </h1>
          <nav className='search-tabs'>
            <ul>
              <li className={activeTab === 'Top Results' ? 'tab-active' : ''} onClick={() => setActiveTab('Top Results')}>Top Results</li>
              <li className={activeTab === 'Artists' ? 'tab-active' : ''} onClick={() => setActiveTab('Artists')}>Artists</li>
              <li className={activeTab === 'Albums' ? 'tab-active' : ''} onClick={() => setActiveTab('Albums')}>Albums</li>
              <li className={activeTab === 'Tracks' ? 'tab-active' : ''} onClick={() => setActiveTab('Tracks')}>Tracks</li>
            </ul>
            <div className='tab-underline'></div>
          </nav>
          <SearchBar onSearch={handleSearchSubmit} onClear={handleClearSearch} initialQuery={currentSearchQuery} />
        </div>
        <div className='main-container'>
          <div>Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header initialQuery={currentSearchQuery} />
        <div className='search-results-container'>
          <h1 className='search-title'>
            Search results for <span className='search-query'>“{currentSearchQuery}”</span>
          </h1>
          <nav className='search-tabs'>
            <ul>
              <li className={activeTab === 'Top Results' ?'tab-active' : ''} onClick={() => setActiveTab('Top Results')}>Top Results</li>
              <li className={activeTab === 'Artists' ?'tab-active' : ''} onClick={() => setActiveTab('Artists')}>Artists</li>
              <li className={activeTab === 'Albums' ?'tab-active' : ''} onClick={() => setActiveTab('Albums')}>Albums</li>
              <li className={activeTab === 'Tracks' ?'tab-active' : ''} onClick={() => setActiveTab('Tracks')}>Tracks</li>
            </ul>
            <div className='tab-underline'></div>
          </nav>
          <SearchBar onSearch={handleSearchSubmit} onClear={handleClearSearch} initialQuery={currentSearchQuery}/>
        </div>
        <div className='main-container'>
          <div>Error: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header initialQuery={currentSearchQuery} />
      <div className='search-results-container'>
        <h1 className='search-title'>
          Search results for <span className='search-query'>“{currentSearchQuery}”</span>
        </h1>
        <nav className='search-tabs'>
          <ul>
            <li className={activeTab === 'Top Results' ?'tab-active' : ''} onClick={() => setActiveTab('Top Results')}>Top Results</li>
            <li className={activeTab === 'Artists' ?'tab-active' : ''} onClick={() => setActiveTab('Artists')}>Artists</li>
            <li className={activeTab === 'Albums' ?'tab-active' : ''} onClick={() => setActiveTab('Albums')}>Albums</li>
            <li className={activeTab === 'Tracks' ?'tab-active' : ''} onClick={() => setActiveTab('Tracks')}>Tracks</li>
          </ul>
          <div className='tab-underline'></div>
        </nav>
        <SearchBar onSearch={handleSearchSubmit} onClear={handleClearSearch} initialQuery={currentSearchQuery} />
      </div>

      <div className='main-container'>
        {(activeTab === 'Top Results' || activeTab === 'Artists') && artists.length > 0 && (
          <div className='main-section'>
            <SectionTitle titleText="Artists" className='main-section-title' />
            <div className='main-section-grid'>
              {artists.map((artist, index) => (
                <SearchArtistCard key={index} artist={artist} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'Top Results' || activeTab === 'Albums') && albums.length > 0 && (
          <div className='main-section'>
            <SectionTitle titleText="Albums" className='main-section-title' />
            <div className='main-section-grid'>
              {albums.map((album, index) => (
                <AlbumCard key={index} album={album} />
              ))}
            </div>
          </div>
        )}

        {(activeTab === 'Top Results' || activeTab === 'Tracks') && tracks.length > 0 && (
          <div className='tracks-section'>
            <SectionTitle titleText="Tracks" className='main-section-title' />
            <div className='tracks-list'>
              {tracks.map((track, index) => (
                <TrackRow key={index} track={track} />
              ))}
            </div>
          </div>
        )}

        {artists.length === 0 && albums.length === 0 && tracks.length === 0 && (
          <p>No results found for "{currentSearchQuery}"</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Search;