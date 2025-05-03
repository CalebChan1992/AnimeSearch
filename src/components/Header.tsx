import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <AppBar position="static" sx={{
      backgroundColor: '#673ab7', // Purple color from the screenshot
      boxShadow: 'none',
      mb: 0,
      height: '48px',
      borderRadius: 0,
      '& .MuiPaper-root': {
        borderRadius: 0
      }
    }}>
      <Container maxWidth={false} sx={{ width: '1200px', px: 2 }}>
        <Toolbar disableGutters sx={{ minHeight: '48px' }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: 700,
              color: 'white',
              textDecoration: 'none',
              fontSize: '1rem'
            }}
          >
            {title}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
