import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import useDebounce from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  debounceTime?: number;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, debounceTime = 500, isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const debouncedQuery = useDebounce(query, debounceTime);

  // Effect to trigger search when the debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
      setIsTyping(false);
    }
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setIsTyping(false);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search anime..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        {isTyping && (
          <div className="loading-indicator">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
