import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Feed from "./routes/Feed";
import Player from "./routes/Player";
import Home from "./routes/Home";
import { VideoProvider } from "./context/videoContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/player/:id",
        element: <Player />,
      },
    ],
  },
]);
const YtApp = () => {
  return (
    <>
      <VideoProvider>
        <RouterProvider router={router} />
      </VideoProvider>
    </>
  );
};

export default YtApp;
