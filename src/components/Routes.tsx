import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Chat from "./chat/Chat";
import Home from "./home/Home";
import { createBrowserRouter } from "react-router-dom";
import Profile from "./profile/Profile";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chats/:_id",
    element: <Chat />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
