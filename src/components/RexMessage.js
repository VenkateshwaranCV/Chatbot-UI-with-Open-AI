import React from 'react';
import { Grid, Typography } from '@mui/material';
import ChatStyles from '../styles/ChatStyles';
import rexAvatar from '../assets/rex-avatar.png'; // Ensure the path is correct

const RexMessage = ({ rexMessage }) => {
  return (
    <Grid container sx={ChatStyles.rexMessageContainer}>
      <Grid item sx={ChatStyles.rexMessageAvatarContainer}>
        <img src={rexAvatar} alt="Rex" style={ChatStyles.rexMessageAvatar} />
      </Grid>
      <Grid item sx={ChatStyles.rexMessageTextContainer}>
        <Typography sx={ChatStyles.rexMessageText}>{rexMessage}</Typography>
      </Grid>
    </Grid>
  );
};

export default RexMessage;
