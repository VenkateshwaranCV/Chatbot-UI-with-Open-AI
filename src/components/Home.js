import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import rexLogo from '../assets/rex-logo.png'; // Ensure the path is correct

const Home = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ height: '100vh', backgroundColor: '#282c34' }}
    >
      <Grid item>
        <img src={rexLogo} alt="Rex Logo" style={{ width: '150px', marginBottom: '20px' }} />
      </Grid>
      <Grid item>
        <Typography variant="h3" style={{ color: 'white' }}>
          Hello, this is Rex
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          <Link to="/chat" style={{ color: '#9c27b0' }}>
            Go to Chat
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
