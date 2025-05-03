import {
  Box,
  Pagination as MuiPagination,
  PaginationItem,
  FormControl,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
  Stack,
  InputLabel
} from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

const Pagination = ({ currentPage, totalPages, onPageChange, loading = false }: PaginationProps) => {
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    // Prevent default to avoid any potential form submission
    if (_event) {
      if (_event.preventDefault) {
        _event.preventDefault();
      }

      // Also stop propagation to prevent event bubbling
      if (_event.stopPropagation) {
        _event.stopPropagation();
      }
    }

    // Only change page if it's different from current page
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePageSelect = (e: SelectChangeEvent<number>) => {
    // Prevent default behavior to avoid page refresh
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Stop event propagation to prevent it from bubbling up to any parent forms
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }

    const selectedPage = e.target.value as number;
    if (selectedPage !== currentPage) {
      onPageChange(selectedPage);
    }
  };

  // Generate menu items for the dropdown - optimized for large page counts
  const generatePageOptions = () => {
    // Use a Set to track which page numbers we've already added
    const addedPageNumbers = new Set<number>();
    const options = [];

    // If we have a reasonable number of pages, show all of them
    if (totalPages <= 100) {
      for (let i = 1; i <= totalPages; i++) {
        options.push(
          <MenuItem
            key={`page-${i}`}
            value={i}
            onClick={(e) => {
              // Prevent default behavior
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            Page {i}
          </MenuItem>
        );
      }
      return options;
    }

    // For large number of pages, show a subset with logical grouping
    // Always show first 5 pages
    for (let i = 1; i <= 5; i++) {
      addedPageNumbers.add(i);
      options.push(
        <MenuItem
          key={`page-${i}`}
          value={i}
          onClick={(e) => {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Page {i}
        </MenuItem>
      );
    }

    // Add divider if needed
    if (currentPage > 8) {
      options.push(
        <MenuItem key="divider1" value={-1} disabled>
          ...
        </MenuItem>
      );
    }

    // Show pages around current page
    const start = Math.max(6, currentPage - 2);
    const end = Math.min(totalPages - 5, currentPage + 2);

    for (let i = start; i <= end; i++) {
      // Skip if we've already added this page number
      if (addedPageNumbers.has(i)) continue;

      addedPageNumbers.add(i);
      options.push(
        <MenuItem
          key={`page-${i}`}
          value={i}
          onClick={(e) => {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Page {i}
        </MenuItem>
      );
    }

    // Add divider if needed
    if (currentPage < totalPages - 7) {
      options.push(
        <MenuItem key="divider2" value={-2} disabled>
          ...
        </MenuItem>
      );
    }

    // Always show last 5 pages
    for (let i = Math.max(totalPages - 4, end + 1); i <= totalPages; i++) {
      // Skip if we've already added this page number
      if (addedPageNumbers.has(i)) continue;

      addedPageNumbers.add(i);
      options.push(
        <MenuItem
          key={`page-${i}`}
          value={i}
          onClick={(e) => {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          Page {i}
        </MenuItem>
      );
    }

    return options;
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ my: 4 }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        siblingCount={1}
        boundaryCount={1}
        showFirstButton
        showLastButton
        hidePrevButton={false}
        hideNextButton={false}
        disabled={loading}
        renderItem={(item) => {
          // Create a custom handler that prevents default behavior
          const handleItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            // Prevent default behavior
            e.preventDefault();
            e.stopPropagation();

            // Only trigger the click if it's not the current page
            if (item.page !== currentPage && item.onClick) {
              // Wrap in setTimeout to ensure event is fully processed
              setTimeout(() => {
                if (item.onClick) {
                  item.onClick(e);
                }
              }, 0);
            }
          };

          // Return the PaginationItem with our custom props
          return (
            <PaginationItem
              slots={{ previous: NavigateBefore, next: NavigateNext }}
              component="button"
              {...item}
              onClick={handleItemClick}
            />
          );
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="page-select-label">Page</InputLabel>
          <Select
            labelId="page-select-label"
            id="page-select"
            value={currentPage}
            onChange={handlePageSelect}
            label="Page"
            // Add onClick handler to prevent default behavior
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
              // Prevent menu from closing on select
              autoFocus: false,
              disableAutoFocusItem: true,
              // Prevent any form submission
              disableScrollLock: true,
              // Prevent click events from bubbling
              disablePortal: true,
              // Add click handler to menu items
              onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            // Disable native functionality to prevent form submission
            native={false}
          >
            {generatePageOptions()}
          </Select>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          of {totalPages} pages
        </Typography>
      </Box>
    </Stack>
  );
};

export default Pagination;
