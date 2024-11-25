import { Minimize2 } from "lucide-react";
import { OutPortal } from "react-reverse-portal";
import { useVideoContext } from "../context/videoContext";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";

const Player = () => {
  const { videos, portalNode, setVideoId, isMinimized, setIsMinimized } =
    useVideoContext();
  const { id } = useParams();
  const navigate = useNavigate();

  // const videoId = videos.find((video) => video.id === id)?.path;
  console.log(id, videos);

  useEffect(() => {
    setVideoId(id || "");
  }, [id, setVideoId]);

  const minimize = useCallback(() => {
    if (isMinimized) return;
    setIsMinimized(true);
    navigate("/");
    // if (miniContainerRef.current) {
    //   miniContainerRef.current.style.opacity = "1";
    // }
  }, [isMinimized, navigate, setIsMinimized]);
  useEffect(() => {
    setIsMinimized(false);
  }, [setIsMinimized]);
  // useEffect(() => {
  //   console.log(videoRef.current, videoRef.current?.paused);

  //   if (!videoRef.current) return;
  //   videoRef.current.play();
  //   // if (videoRef.current.paused) {
  //   // }
  // }, [videoRef]);
  return (
    <>
      <div
        className={`w-full aspect-video bg-black relative transition-all duration-300
          ${
            // isMinimized
            //   ? "opacity-0 pointer-events-none transform"
            // :
            "opacity-100"
          }`}
      >
        {/* {playerState === "main" && <OutPortal node={portalNode.current} />} */}
        {/* {playerState === "main" && videoElement } */}
        {/* <video
          // key={111}
          // ref={videoRef}
          // src={videoUrl}
          className="w-full h-full object-contain"
          // onClick={handlePlayPause}
          controls={true}
        /> */}
        <OutPortal node={portalNode.current} />

        <button
          onClick={minimize}
          className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full 
            hover:bg-black/70 transition-colors z-50"
        >
          <Minimize2 className="w-5 h-5 text-white" />
        </button>
      </div>
    </>
  );
};

export default Player;
