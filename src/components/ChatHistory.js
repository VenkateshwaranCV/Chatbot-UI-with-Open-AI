import React from 'react';
import { Grid } from '@mui/material';
import RexMessage from './RexMessage';
import UserMessage from './UserMessage';

const ChatHistory = ({ ThisSessions }) => (
  <Grid>
    {ThisSessions?.chats?.map((chat, i) =>
      Object.keys(chat).map((key) => 
        key === "Rex" ? (
          <RexMessage rexMessage={chat.Rex} key={"rex" + i} />
        ) : (
          <UserMessage userMessage={chat.user} key={"user" + i} />
        )
      )
    )}
  </Grid>
);

export default ChatHistory;