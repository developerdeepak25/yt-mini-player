import { Maximize2, X } from "lucide-react";
import { InPortal, OutPortal } from "react-reverse-portal";
import { Outlet, useNavigate } from "react-router-dom";
import { useVideoContext } from "../context/videoContext";
import VideoPlayer from "../componnets/VideoPlayer";
import { useCallback, useEffect } from "react";

const Home = () => {
  // const playerState: "main" | "mini" = "mini";
  const { isMinimized, setIsMinimized, videoRef, portalNode, currnetVideo } =
    useVideoContext();
  const navigate = useNavigate();
  // const miniContainerRef = useRef<HTMLDivElement>(null);

  const restore = useCallback(() => {
    if (!isMinimized) return;
    setIsMinimized(false);
    navigate(`/player/${currnetVideo?.id}`);
    // if (miniContainerRef.current) {
    //   miniContainerRef.current.style.opacity = "0";
    // }
  }, [currnetVideo?.id, isMinimized, navigate, setIsMinimized]);

  const close = useCallback(() => {
    if (!videoRef.current) return;
    // if (!isMinimized ) return;
    setIsMinimized(false);
    // videoRef.current === null
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  }, [setIsMinimized, videoRef]);
  // console.log(portalNode.current);

  // useEffect(() => {
    // portalNode.current.height = "100%";
    // console.log(`isMinimized`, isMinimized);
  // }, [portalNode]);

  return (
    <>
      <div className="h-full w-full relative">
        {/* <div>Home</div> */}
        <Outlet />
        <div
          // ref={miniContainerRef}
          className={`
          fixed bottom-4 right-4 w-80 h-44 bg-black shadow-lg rounded-lg overflow-hidden
          transition-all duration-200 ease-in-out flex  justify-center 
          ${
            isMinimized
              ? "opacity-100 transform translate-y-0 pointer-events-auto"
              : "opacity-0 transform -translate-y-20 pointer-events-none"
          }
          `}
        >

          {isMinimized && <OutPortal node={portalNode.current}  />}

          <div
            className="absolute top-0 right-0 flex gap-1 p-2 
          bg-gradient-to-b from-black/50 to-transparent w-full z-50"
          >
            <button
              onClick={restore}
              className="p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={close}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      <InPortal node={portalNode.current} >
        <VideoPlayer videoRef={videoRef} videoUrl={currnetVideo?.path || ""} />
      </InPortal>
    </>
  );
};

export default Home;
