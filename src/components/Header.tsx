import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';

/**
 * Интерфейс для пропсов Header.
 * @interface HeaderProps
 * @property {string} [initialQuery] - Необязательный начальный запрос для поля поиска.
 */
interface HeaderProps {
  initialQuery?: string;
}

/**
 * Отображает заголовок навигации сайта.
 * Он включает логотип, элементы навигации и кнопку для переключения между
 * стандартной навигацией и строкой поиска. При активации поиска,
 * отображается компонент `SearchBar`.
 *
 * @component
 * @param {HeaderProps} props - Пропсы.
 * @param {string} [props.initialQuery] - Начальный поисковый запрос.
 * @returns {React.FC<HeaderProps>} Заголовок страницы.
 */
const Header: React.FC<HeaderProps> = ({ initialQuery }) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const history = useHistory();
  const location = useLocation();

  const headerSearchInputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    if (location.pathname !== '/search' && showSearchInput) {
      setShowSearchInput(false);
    }
  }, [location.pathname]);

  const handleSearchToggle = () => {
    setShowSearchInput(true);
  };

  const handleSearchBackFromHeader = () => {
    setShowSearchInput(false);
  };

  const handleHeaderSearchSubmit = (query: string) => {
    if (query.trim()) {
      history.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSearchInput(false);
    }
  };

  return (
    <nav>
      <div className='head-nav-container'>
        {showSearchInput ? (
          <SearchBar
            variant="header"
            onSearch={handleHeaderSearchSubmit}
            onClear={handleSearchBackFromHeader}
            initialQuery=""
            inputRef={headerSearchInputRef}
          />
        ) : (

          <>
            <a href='./' className='head-nav-logo'>last.fm</a>
            <div className='head-nav-bar'>
              <button
                className='head-search-toggle-btn'
                aria-label='Search'
                onClick={handleSearchToggle}
              >
                <i className='fa-solid fa-magnifying-glass'></i>
              </button>
              <div className='nav-list'>
                <ul>
                  <li><a>Live</a></li>
                  <li><a>Music</a></li>
                  <li><a>Charts</a></li>
                  <li><a>Events</a></li>
                </ul>
              </div>
              <div className='nav-divider'></div>
              <div className='nav-auth'>
                <ul>
                  <li id='log-in'><a>Log in</a></li>
                  <li id='sign-up'><a>SIGN UP</a></li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;