import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import rexLogo from '../assets/rex-avatar.png';

const Navigation = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={rexLogo} alt="ReX Logo" style={{ width: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component="div">
            ReX App
          </Typography>
        </Box>
        <Box>
          <Button
            color={location.pathname === '/' ? 'inherit' : 'secondary'}
            component={Link}
            to="/"
          >
            HOME
          </Button>
          <Button
            color={location.pathname === '/chat' ? 'inherit' : 'secondary'}
            component={Link}
            to="/chat"
          >
            CHAT
          </Button>
          <Button
            color={location.pathname === '/history' ? 'inherit' : 'secondary'}
            component={Link}
            to="/history"
          >
            CHAT HISTORY
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
