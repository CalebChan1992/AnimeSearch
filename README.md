# AnimeSearch

A modern web application for searching and exploring anime using the Jikan API (MyAnimeList unofficial API).

## Features

- Search for anime by title
- Browse top-rated anime
- Sort anime by ranking, score, popularity, or members
- View detailed information about each anime
- Responsive design for desktop and mobile devices
- Pagination for browsing through large result sets

## Technologies Used

- **React** - Frontend library for building user interfaces
- **TypeScript** - Static type checking for JavaScript
- **React Router** - Navigation and routing
- **Axios** - HTTP client for API requests
- **Vite** - Fast build tool and development server
- **CSS** - Custom styling

## API

This project uses the [Jikan API](https://jikan.moe/), an unofficial MyAnimeList API, to fetch anime data. The API provides:

- Search functionality
- Top anime listings
- Detailed anime information
- Anime rankings, scores, popularity metrics, and member counts
- And more!

The application leverages these data points to provide sorting functionality, allowing users to organize anime by:
- Rank (ascending order, with rank 1 being the best)
- Score (descending order, with higher scores at the top)
- Popularity (ascending order, with popularity rank 1 being the most popular)
- Members (descending order, with higher member counts at the top)

The UI is built with [Material-UI (MUI)](https://mui.com/), a popular React UI framework that implements Google's Material Design. Key features include:

- Responsive design with MUI components
- Custom theme configuration
- Consistent styling across the application

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AnimeSearch.git
   cd AnimeSearch
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
AnimeSearch/
├── public/             # Static files
├── src/                # Source files
│   ├── components/     # Reusable components
│   │   ├── AnimeCard.tsx     # Card component for displaying anime
│   │   ├── AnimeList.tsx     # List component for displaying multiple anime
│   │   ├── ErrorBoundary.tsx # Error handling component
│   │   ├── Header.tsx        # App header component
│   │   ├── Pagination.tsx    # Pagination controls
│   │   ├── ScrollToTop.tsx   # Utility for scrolling to top on navigation
│   │   ├── SearchBar.tsx     # Search input component
│   │   └── SortSelector.tsx  # Sorting options dropdown
│   ├── pages/          # Page components
│   │   ├── AnimeDetail.tsx   # Detail page for a single anime
│   │   └── Home.tsx          # Home page with search and anime list
│   ├── services/       # API services
│   │   └── animeService.ts   # Service for Jikan API calls
│   ├── types/          # TypeScript type definitions
│   │   └── anime.ts          # Type definitions for anime data
│   ├── hooks/          # Custom React hooks
│   │   └── useDebounce.ts    # Hook for debouncing search input
│   ├── theme.ts        # MUI theme configuration
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Entry point
│   └── ...
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
├── eslint.config.js    # ESLint configuration
└── README.md           # Project documentation
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Jikan API](https://jikan.moe/) for providing the anime data
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the development framework
- [MyAnimeList](https://myanimelist.net/) for being the source of the anime database
