import { Minimize2 } from "lucide-react";
import { OutPortal } from "react-reverse-portal";
import { useVideoContext } from "../context/videoContext";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";

const Player = () => {
  const { portalNode, setVideoId, isMinimized, setIsMinimized } =
    useVideoContext();
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id, videos);

  useEffect(() => {
    setVideoId(id || "");
  }, [id, setVideoId]);

  const minimize = useCallback(() => {
    if (isMinimized) return;
    setIsMinimized(true);
    navigate("/");
  }, [isMinimized, navigate, setIsMinimized]);
  useEffect(() => {
    setIsMinimized(false);
  }, [setIsMinimized]);
  return (
    <>
      <div
        className={`w-full aspect-video  relative transition-all duration-300
          ${"opacity-100"}`}
      >
        <div className="w-[80%] mx-auto relative bg-black h-[640px] flex justify-center">
          <OutPortal node={portalNode.current} className='h-full'/>

          <button
            onClick={minimize}
            className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full 
          hover:bg-black/70 transition-colors z-50"
          >
            <Minimize2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Player;
