import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh'
        }}>
            <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 500 }}>
                <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
                    404
                </Typography>
                <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                    Page Not Found
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    The page you are looking for does not exist or has been moved.
                </Typography>
                <Button variant="contained" component={Link} to="/">
                    Go to Home Page
                </Button>
            </Paper>
        </Box>
    );
};

export default NotFoundPage;
