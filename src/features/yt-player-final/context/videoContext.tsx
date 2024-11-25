import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
  Component,
} from "react";
import { createHtmlPortalNode, HtmlPortalNode } from "react-reverse-portal";

// Define the type for the context state

// Define the type for the context value
interface ContextType {
  isMinimized: boolean;
  setIsMinimized: Dispatch<SetStateAction<boolean>>;
  videos: videoType[];
  videoRef: React.RefObject<HTMLVideoElement>;
  portalNode: React.MutableRefObject<HtmlPortalNode<Component<any>>>;
  videoId: string;
  setVideoId: Dispatch<SetStateAction<string>>;
  currnetVideo: videoType | undefined;
}
type videoType = {
  id: string;
  title: string;
  path: string;
};

// Create a Context
const VideoContext = createContext<ContextType | undefined>(undefined);

const videoList = [
  {
    id: "1a2b3c",
    title: "Inspirational Highlights",
    path: "/6959285-sd_640_360_25fps.mp4",
  },
  {
    id: "2d3e4f",
    title: "Adventure Moments",
    path: "/7346214-sd_720_540_25fps.mp4",
  },
  {
    id: "3g4h5i",
    title: "City Walkthrough",
    path: "/12488488_640_360_30fps.mp4",
  },
  {
    id: "4j5k6l",
    title: "Documentary Preview",
    path: "/18921613-sd_640_360_30fps.mp4",
  },
  // {
  //   id: "5m6n7o",
  //   title: "Screen Recording",
  //   path: "/screen-capture-_4.mp4",
  // },
  {
    id: "6p7q8r",
    title: "Project Recap",
    path: "/Untitled video - Made with Clipchamp.mp4",
  },
  {
    id: "7s8t9u",
    title: "Daily Vlog Highlights",
    path: "/12488488_640_360_30fps.mp4",
  },
  {
    id: "8v9w0x",
    title: "Nature Clips",
    path: "/6959285-sd_640_360_25fps.mp4",
  },
  {
    id: "5m6n7o",
    title: "Nature Clip",
    path: "/6959285-sd_640_360_25fps.mp4",
  },
  {
    id: "9y0z1a",
    title: "Tech Demo",
    path: "/18921613-sd_640_360_30fps.mp4",
  },
];

// Create a provider component
interface VideoProviderProps {
  children: ReactNode;
}

export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [videos] = useState<videoType[]>(videoList);
  const videoRef = useRef<HTMLVideoElement>(null);
  const portalNode = useRef(createHtmlPortalNode());
  const [videoId, setVideoId] = useState<string>("");
  // const [currentVideo, setCurrentVideo] = useState<videoType | null>(null);

  //   const updateState = (newState: StateType) => {
  //     setIsMinimized(newState);
  //   };
  const currnetVideo  = videoId ? videos.find((video) => video.id === videoId): undefined;

  return (
    <VideoContext.Provider
      value={{
        isMinimized,
        setIsMinimized,
        videos,
        videoRef,
        portalNode,
        videoId,
        setVideoId,
        currnetVideo,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

// Create a custom hook for using the context
export const useVideoContext = (): ContextType => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoProvider");
  }
  return context;
};

// Initial state placeholder
// const initialState: StateType = {
//   key: "value",
// };
