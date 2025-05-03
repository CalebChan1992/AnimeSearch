import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export type SortOption = 'rank' | 'score' | 'popularity' | 'members' | 'none';

interface SortSelectorProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  disabled?: boolean;
}

const SortSelector = ({ value, onChange, disabled = false }: SortSelectorProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as SortOption);
  };

  return (
    <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }} disabled={disabled}>
      <InputLabel id="sort-selector-label">Sort By</InputLabel>
      <Select
        labelId="sort-selector-label"
        id="sort-selector"
        value={value}
        onChange={handleChange}
        label="Sort By"
      >
        <MenuItem value="none">Default</MenuItem>
        <MenuItem value="rank">Rank</MenuItem>
        <MenuItem value="score">Score</MenuItem>
        <MenuItem value="popularity">Popularity</MenuItem>
        <MenuItem value="members">Members</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelector;
