import React, { ReactNode, useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';

interface FallbackProps {
  error: Error | null;
  resetErrorBoundary: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: React.ComponentType<FallbackProps>;
  onError?: (error: Error, info: { componentStack: string }) => void;
}

// Fallback component to display when an error occurs
const DefaultFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <Container maxWidth="md" sx={{ mt: 8 }}>
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="error">
          Something went wrong
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We're sorry, but an error occurred while rendering this page.
        </Typography>
        {error && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, fontFamily: 'monospace', p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            {error.toString()}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={resetErrorBoundary}
          sx={{ mt: 2 }}
        >
          Reload Page
        </Button>
      </Box>
    </Paper>
  </Container>
);

// Since React doesn't have a hook-based error boundary API yet,
// we need to create a wrapper component that uses the class-based API
class ErrorBoundaryInner extends React.Component<
  ErrorBoundaryProps & {
    setError: (error: Error | null) => void
  },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: ErrorBoundaryProps & { setError: (error: Error | null) => void }) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  // We need to accept the error parameter for the React API
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    this.props.setError(error);
    this.setState({ error });
    if (this.props.onError) {
      this.props.onError(error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.FallbackComponent || DefaultFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetErrorBoundary={() => {
            this.setState({ hasError: false, error: null });
            this.props.setError(null);
            window.location.reload();
          }}
        />
      );
    }

    return this.props.children;
  }
}

// Function component wrapper for the error boundary
const ErrorBoundary = ({
  children,
  FallbackComponent,
  onError
}: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error && onError) {
      console.error('Error caught by ErrorBoundary:', error);
    }
  }, [error, onError]);

  return (
    <ErrorBoundaryInner
      setError={setError}
      FallbackComponent={FallbackComponent}
      onError={onError}
    >
      {children}
    </ErrorBoundaryInner>
  );
}

export default ErrorBoundary;
