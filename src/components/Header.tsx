import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/" style={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
                    OSINT Web Scanner
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SearchIcon sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">
                        Domain Intelligence Tool
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
