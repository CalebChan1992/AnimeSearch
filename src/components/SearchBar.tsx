import { useState, useEffect, FormEvent } from 'react';
import { TextField, IconButton, Box, Container, CircularProgress } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import useDebounce from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  debounceTime?: number;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, debounceTime = 250 }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const debouncedQuery = useDebounce(query, debounceTime);

  // Effect to trigger search when the debounced query changes
  useEffect(() => {
    // Always trigger search, even when query is empty
    onSearch(debouncedQuery.trim());
    setIsTyping(false);
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsTyping(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Only trigger immediate search if the query differs from the debounced one
    // This prevents double API calls
    if (query.trim() !== debouncedQuery.trim()) {
      onSearch(query.trim());
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    // The empty string will be passed to onSearch via the useEffect hook
    // when the debouncedQuery updates
    setIsTyping(false);
  };

  return (
    <Container maxWidth={false} sx={{
      width: '1200px',
      mt: 2,
      mb: 2,
      px: 2
    }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <Box sx={{ position: 'relative', width: '100%' }}>
          <TextField
            fullWidth
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: 'background.paper',
              '& .MuiOutlinedInput-root': {
                height: '40px',
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              }
            }}
          />
          <Box sx={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
            {isTyping && <CircularProgress size={16} color="primary" sx={{ mr: 1 }} />}
            {query ? (
              <IconButton
                aria-label="clear search"
                onClick={handleClear}
                edge="end"
                size="small"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ) : (
              <SearchIcon
                sx={{
                  color: 'action.active'
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SearchBar;
