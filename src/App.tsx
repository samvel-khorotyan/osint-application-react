import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ScanDetailsPage from './pages/ScanDetailsPage';
import NotFoundPage from './pages/NotFoundPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
});

const App: React.FC = () => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/scans/:id" element={<ScanDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        </Router>
      </ThemeProvider>
  );
};

export default App;
