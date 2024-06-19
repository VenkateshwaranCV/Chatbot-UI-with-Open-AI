import React, { useEffect, useState } from "react";
import api from "../../api/sessions";
import { Grid, CircularProgress, Typography, Link } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import ActivityStyles from "../../styles/activity";
import ChatHistory from "../../components/ChatHistory";

const Activity = () => {
  const [loading, setLoading] = useState(true);
  const [sessionDates, setSessionDates] = useState([]);
  const [sessionChatLengths, setSessionChatLengths] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        console.log('API Response:', response.data);
        setSessions(response.data.reverse());
        setSessionDates(response.data.map((data) => data.date.split(" ")[0]));
        setSessionChatLengths(response.data.map((data) => data.chats.length));
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSessions();
  }, []);

  const handleDelete = async (sessionId) => {
    try {
      await api.delete(`/sessions/${sessionId}`);
      setSessions(sessions.filter(session => session.id !== sessionId));
    } catch (err) {
      console.error('Error deleting session:', err);
    }
  };

  console.log('Loading:', loading);
  console.log('Sessions:', sessions);

  return (
    <Grid container {...ActivityStyles.activityBody}>
      <Grid container item {...ActivityStyles.titleOutline}>
        <Typography {...ActivityStyles.title}>Your Statistics</Typography>
      </Grid>
      <Grid container item>
        <Typography {...ActivityStyles.description}>
          Graph of the conversation you had with ReX this year.
        </Typography>
      </Grid>
      <Grid container item>
        {loading ? (
          <CircularProgress />
        ) : (
          <BarChart
            xAxis={{ scaleType: "band", data: sessionDates }}
            series={[{ data: sessionChatLengths }]}
            width={500}
            height={300}
          />
        )}
      </Grid>
      <Grid container item {...ActivityStyles.endedChatsTitle}>
        <Grid {...ActivityStyles.endedChats}>Details Chat Activity</Grid>
        <Grid>
          <Link {...ActivityStyles.seeAllLink} href="/activityDetails">
            See All
          </Link>
        </Grid>
      </Grid>
      <Grid container item>
        {loading ? (
          <CircularProgress />
        ) : (
          sessions.map(
            (session, i) =>
              session.isSessionEnded && i < 4 && (
                <ChatHistory
                  key={session.id}
                  id={session.id}
                  date={session.date}
                  session={session}
                  lasttext={
                    session.chats.length
                      ? session.chats[session.chats.length - 1].ReX
                        ? session.chats[session.chats.length - 1].ReX
                        : session.chats[session.chats.length - 1].user
                      : ""
                  }
                  sessionEnded={session.isSessionEnded}
                  handleDelete={() => handleDelete(session.id)}
                  isActivity={true}
                />
              )
          )
        )}
      </Grid>
    </Grid>
  );
};

export default Activity;
