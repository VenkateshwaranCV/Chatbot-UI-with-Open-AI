import React from 'react';
import { Typography, Box } from '@mui/material';
import ChatStyles from '../styles/ChatStyles';

const UserMessage = ({ userMessage }) => (
  <Box sx={{ ...ChatStyles.messageBubble, ...ChatStyles.userBubble }}>
    <Typography variant="body1">{userMessage}</Typography>
  </Box>
);

export default UserMessage;
