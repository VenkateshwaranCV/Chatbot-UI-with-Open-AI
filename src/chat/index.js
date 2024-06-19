import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import ChatStyles from '../styles/ChatStyles';
import UserMessage from '../components/UserMessage';
import RexMessage from '../components/RexMessage';
import { OpenAI } from 'openai';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
  const { id } = useParams();
  const [userPrompt, setUserPrompt] = useState('');
  const [rexReply, setRexReply] = useState('');
  const [sessions, setSessions] = useState([]);
  const [thisSession, setThisSession] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get('/sessions', {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
          }
        });
        setSessions(response.data);
        const currentSession = response.data.find(session => parseInt(session.id, 10) === parseInt(id, 10));
        setThisSession(currentSession);
      } catch (error) {
        console.error("Error fetching sessions", error);
      }
    };
    fetchSessions();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTyping(true);
    try {
      await callOpenAIAPI();
      const updatedSession = {
        ...thisSession,
        chats: [...thisSession.chats, { user: userPrompt, Rex: rexReply }],
        isSessionEnded: false,
      };
      await axios.patch(`/sessions/${id}/`, updatedSession, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      });
      setSessions(sessions.map(session => session.id === id ? updatedSession : session));
      setUserPrompt('');
    } catch (error) {
      console.error("Error submitting chat message", error);
    } finally {
      setIsTyping(false);
    }
  };

  const callOpenAIAPI = async () => {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY });
    //const openai = new OpenAI({ apiKey: "sk-proj-ztrXMTn3NbSFvuPODjFlT3BlbkFJU66CSjp7kskXcqYwPdFu" });
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Your name is Rex. You are a career advice assistant. You give advice to Andrew about his career" },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 100,
    });
    setRexReply(completion.data.choices[0].message.content);
  };

  return (
    <Box sx={ChatStyles.chatContainer}>
      <Box sx={ChatStyles.header}>
        <Typography variant="h4">Chat with Rex</Typography>
      </Box>
      <Box sx={ChatStyles.chatHistory}>
        {thisSession?.chats?.map((chat, i) =>
          Object.keys(chat).map(key => key === "Rex" ? (
            <Box sx={{ ...ChatStyles.messageBubble, ...ChatStyles.rexBubble, ...ChatStyles.message }} key={`rex${i}`}>
              <RexMessage rexMessage={chat.Rex} />
            </Box>
          ) : (
            <Box sx={{ ...ChatStyles.messageBubble, ...ChatStyles.userBubble, ...ChatStyles.message }} key={`user${i}`}>
              <UserMessage userMessage={chat.user} />
            </Box>
          ))
        )}
      </Box>
      {thisSession && !thisSession.isSessionEnded ? (
        <Box component="form" onSubmit={handleSubmit} sx={ChatStyles.textArea}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            onChange={(e) => setUserPrompt(e.target.value)}
            value={userPrompt}
            sx={ChatStyles.inputText}
          />
          <IconButton type="submit" sx={ChatStyles.sendButton}>
            <SendIcon />
          </IconButton>
        </Box>
      ) : null}
      {isTyping && <div>Rex is typing...</div>}
    </Box>
  );
};

export default Chat;
