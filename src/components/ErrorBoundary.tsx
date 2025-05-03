import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom color="error">
                Something went wrong
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                We're sorry, but an error occurred while rendering this page.
              </Typography>
              {this.state.error && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontFamily: 'monospace', p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                  {this.state.error.toString()}
                </Typography>
              )}
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.handleReload}
                sx={{ mt: 2 }}
              >
                Reload Page
              </Button>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
