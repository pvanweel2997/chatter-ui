import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useMessageCreated } from "../../hooks/useMessageCreated";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const [createMessage] = useCreateMessage(chatId);
  const { data } = useGetChat({ _id: chatId });
  const { data: messages } = useGetMessages({ chatId });
  const { data: latestMessage } = useMessageCreated({ chatId });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  console.log("=== latestMessage", latestMessage);

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {messages?.messages.map((message) => (
          <Grid container alignItems="center" marginBottom="1rem">
            <Grid item xs={2} lg={1}>
              <Avatar src="" sx={{ width: 52, height: 52 }} />
            </Grid>
            <Grid item xs={10} lg={11}>
              <Stack>
                <Paper sx={{ width: "fit-content" }}>
                  <Typography sx={{ padding: "0.9rem" }}>
                    {message.content}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ ml: "0.25rem" }}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
          value={message}
        />
        <Divider />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
