import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Divider, InputBase, Paper, Stack } from "@mui/material";

const Chat = () => {
  const params = useParams();
  const { data } = useGetChat({ _id: params._id! });
  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          placeholder="Message"
        />
        <Divider />
      </Paper>
    </Stack>
  );
};

export default Chat;
