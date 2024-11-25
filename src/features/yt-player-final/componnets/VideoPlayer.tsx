import { useCallback } from "react";

type videoType = {
  videoUrl: string;
  videoRef: React.RefObject<HTMLVideoElement>;
};

const VideoPlayer = ({ videoUrl, videoRef }: videoType) => {
  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [videoRef]);
  return (
    <video
      // key={111}
      ref={videoRef}
      src={videoUrl}
      className="h-full object-contain"
      onClick={handlePlayPause}
      controls={true}
      autoPlay
    
    />
  );
};

export default VideoPlayer;
