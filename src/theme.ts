import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance based on the existing CSS variables
let theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7', // Purple color from the screenshot
      light: '#9575cd',
      dark: '#512da8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f0f0f0',
      light: '#ffffff',
      dark: '#e0e0e0',
      contrastText: '#333333',
    },
    error: {
      main: '#e53935',
    },
    text: {
      primary: '#213547',
      secondary: '#444444',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
          '@media (min-width: 600px)': {
            paddingLeft: '24px',
            paddingRight: '24px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          borderRadius: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
});

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

// Custom theme extensions for anime stats colors
declare module '@mui/material/styles' {
  interface Theme {
    animeStats: {
      score: {
        main: string;
        dark: string;
      };
      rank: {
        main: string;
        dark: string;
      };
      popularity: {
        main: string;
        dark: string;
      };
      members: {
        main: string;
        dark: string;
      };
    };
  }

  interface ThemeOptions {
    animeStats?: {
      score?: {
        main?: string;
        dark?: string;
      };
      rank?: {
        main?: string;
        dark?: string;
      };
      popularity?: {
        main?: string;
        dark?: string;
      };
      members?: {
        main?: string;
        dark?: string;
      };
    };
  }
}

// Add custom anime stats colors to the theme
theme.animeStats = {
  score: {
    main: '#e8efff',
    dark: '#2e51a2',
  },
  rank: {
    main: '#f5ebff',
    dark: '#9256dc',
  },
  popularity: {
    main: '#ffebeb',
    dark: '#e74c3c',
  },
  members: {
    main: '#ebffef',
    dark: '#2ecc71',
  },
};

export default theme;
