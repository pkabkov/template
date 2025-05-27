import React, { useState, useEffect, useRef } from 'react';
import '../styles/index.css';

/**
 * Интерфейс для пропсов SearchBar.
 * @interface SearchBarProps
 * @property {(query: string) => void} onSearch - Callback-функция, вызываемая при отправке поискового запроса.
 * @property {() => void} onClear - Callback-функция, вызываемая при очистке поля ввода или возврате.
 * @property {string} initialQuery - Начальное значение для поля ввода поиска.
 * @property {'page' | 'header'} [variant='page'] - Вариант отображения строки поиска: 'page' для основной страницы поиска, 'header' для использования в заголовке.
 * @property {React.RefObject<HTMLInputElement>} [inputRef] - Необязательная ссылка (ref) на элемент `<input>`,
 * позволяет родительскому компоненту управлять фокусом.
 */
interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  initialQuery: string;
  variant?: 'page' | 'header'; 
  inputRef?: React.RefObject<HTMLInputElement>; 
}

/**
 * Отображает строку поиска
 * с функциональностью отправки запроса и очистки.
 * Он может быть использован в двух вариантах: для основной страницы поиска ('page')
 * и для интегрированного поиска в заголовке ('header').
 *
 * @component
 * @param {SearchBarProps} props - Пропсы.
 * @param {(query: string) => void} props.onSearch - Функция для обработки поискового запроса.
 * @param {() => void} props.onClear - Функция для обработки очистки поля или возврата.
 * @param {string} props.initialQuery - Начальный текст в поле поиска.
 * @param {'page' | 'header'} [props.variant='page'] - Вариант отображения (по умолчанию 'page').
 * @param {React.RefObject<HTMLInputElement>} [props.inputRef] - Внешняя ссылка на элемент ввода.
 * @returns {React.FC<SearchBarProps>} Строка поиска.
 */
const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  onClear, 
  initialQuery, 
  variant = 'page', 
  inputRef 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const internalInputRef = useRef<HTMLInputElement>(null); 
  const currentInputRef = inputRef || internalInputRef;

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (variant === 'header' && currentInputRef.current) {
      currentInputRef.current.focus();
    }
  }, [variant, currentInputRef]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim()); 
  };

  const handleClearButtonClick = () => {
    if (variant === 'page') {
      setQuery(''); 
      if (currentInputRef.current) {
        currentInputRef.current.focus(); 
      }
    } 
    else if (variant === 'header') {
      setQuery(''); 
      onClear(); 
      if (currentInputRef.current) {
        currentInputRef.current.focus(); 
      }
    }
  };

  const formClassName = variant === 'header' ? 'head-search-form' : 'search-form';
  const inputClassName = variant === 'header' ? 'head-search-input' : 'search-input';
  const clearButtonClassName = variant === 'header' ? 'head-search-back' : 'search-clear'; 
  const submitButtonClassName = variant === 'header' ? 'head-search-submit' : 'search-submit'; 
  const clearButtonLabel = variant === 'header' ? 'Back' : 'Clear';

  const showPageClearButton = variant === 'page';
  const showHeaderBackButton = variant === 'header'; 

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <input
        type="text"
        className={inputClassName}
        placeholder="Search for music..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={currentInputRef}
      />
      {(showPageClearButton || showHeaderBackButton) && (
        <button
          type="button" 
          className={clearButtonClassName}
          aria-label={clearButtonLabel}
          onClick={handleClearButtonClick}
        >
        </button>
      )}
      <button
        type="submit" 
        className={submitButtonClassName}
        aria-label="Search"
      >
      </button>
    </form>
  );
};

export default SearchBar;