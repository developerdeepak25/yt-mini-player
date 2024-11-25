import  { useEffect, useRef, useState, useCallback } from "react";
import {
  createHtmlPortalNode,
  InPortal,
  OutPortal,
} from "react-reverse-portal";
import { Maximize2, Minimize2, X } from "lucide-react";


interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  // States
  const [playerState, setPlayerState] = useState<"main" | "mini">("main");
  const [isPlaying, setIsPlaying] = useState(false);
  console.log("🚀 ~ VideoPlayer ~ isPlaying:", isPlaying);

  // Create HTML portal node for the video element
  const portalNode = useRef(createHtmlPortalNode());

  // Refs for containers
  const videoRef = useRef<HTMLVideoElement>(null);
  const miniContainerRef = useRef<HTMLDivElement>(null);

  // Initialize portal node
  // useEffect(() => {
  //   portalNode.current.mount();
  //   return () => {
  //     portalNode.current.unmount();
  //   };
  // }, []);

  // Handle play state changes
  const handlePlayPause = useCallback(() => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Watch video play state
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const minimize = useCallback(() => {
    if (playerState === "mini") return;
    setPlayerState("mini");

    if (miniContainerRef.current) {
      miniContainerRef.current.style.opacity = "1";
    }
  }, [playerState]);

  const restore = useCallback(() => {
    if (playerState === "main") return;
    setPlayerState("main");

    if (miniContainerRef.current) {
      miniContainerRef.current.style.opacity = "0";
    }
  }, [playerState]);

  const close = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
    restore();
  }, [restore]);
  const videoElement = (
    // <InPortal node={portalNode.current}>
    <video
      // key={111}
      ref={videoRef}
      src={videoUrl}
      className="w-full h-full object-contain"
      onClick={handlePlayPause}
      controls={true}
    />
    // </InPortal>
  );

  return (
    <div className="relative">
      {/* Portal Source */}
      <InPortal node={portalNode.current}>
        {/* <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-contain"
          onClick={handlePlayPause}
          controls={true}
        /> */}
        {videoElement}
      </InPortal>

      {/* Main Player */}
      <div
        className={`w-full aspect-video bg-black relative transition-all duration-300
          ${
            playerState === "mini"
              ? "opacity-0 pointer-events-none transform"
              : "opacity-100"
          }`}
      >
        {playerState === "main" && <OutPortal node={portalNode.current} />}
        {/* {playerState === "main" && videoElement } */}

        <button
          onClick={minimize}
          className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full 
            hover:bg-black/70 transition-colors z-50"
        >
          <Minimize2 className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Mini Player */}
      <div
        ref={miniContainerRef}
        className={`
          fixed bottom-4 right-4 w-80 h-44 bg-black shadow-lg rounded-lg overflow-hidden
          transition-all duration-200 ease-in-out
          ${
            playerState === "mini"
              ? "opacity-100 transform translate-y-0 pointer-events-auto"
              : "opacity-0 transform -translate-y-20 pointer-events-none"
          }
        `}
      >
        {playerState === "mini" && <OutPortal node={portalNode.current} />}

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
  );
};

export default VideoPlayer;

// // works like magic but package is as old as a granny - so not considering
// import { Maximize2, Minimize2, X } from "lucide-react";
// import { useEffect, useRef, useState, useCallback } from "react";
// import { createReparentableSpace } from "react-reparenting";

// // Create reparentable space for video
// const { Reparentable, sendReparentableChild } = createReparentableSpace();

// interface VideoPlayerProps {
//   videoUrl: string;
// }

// const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
//   // States
//   const [playerState, setPlayerState] = useState<"main" | "mini">("main");
//   const [isPlaying, setIsPlaying] = useState(false);
//   // const [currentTime, setCurrentTime] = useState(0);

//   console.log(isPlaying, "isPlaying");

//   // Refs for containers
//   const mainContainerRef = useRef<HTMLDivElement>(null);
//   const miniContainerRef = useRef<HTMLDivElement>(null);

//   // Single video ref that will be reparented
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // Handle play state changes
//   const handlePlayPause = useCallback(() => {
//     if (!videoRef.current) return;

//     if (videoRef.current.paused) {
//       const playPromise = videoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise
//           .then(() => setIsPlaying(true))
//           .catch(() => setIsPlaying(false));
//       }
//     } else {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   }, []);

//   // Watch video play state
//   useEffect(() => {
//     if (!videoRef.current) return;

//     const video = videoRef.current;
//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     // const handleTimeUpdate = () => setCurrentTime(video.currentTime);

//     video.addEventListener("play", handlePlay);
//     video.addEventListener("pause", handlePause);
//     // video.addEventListener("timeupdate", handleTimeUpdate);

//     return () => {
//       video.removeEventListener("play", handlePlay);
//       video.removeEventListener("pause", handlePause);
//       // video.removeEventListener("timeupdate", handleTimeUpdate);
//     };
//   }, []);

//   const minimize = useCallback(() => {
//     if (!videoRef.current || playerState === "mini") return;

//     // Reparent the video element
//     sendReparentableChild("main", "mini", 0, 0);

//     // Update state
//     setPlayerState("mini");

//     // Apply transition styles
//     if (miniContainerRef.current) {
//       // miniContainerRef.current.style.transform = "translate(0, 0)";
//       miniContainerRef.current.style.opacity = "1";
//     }
//   }, [playerState]);

//   const restore = useCallback(() => {
//     console.log("restore");

//     if (!videoRef.current || playerState === "main") return;

//     // Reparent the video element
//     sendReparentableChild("mini", "main", 0, 0);

//     // Update state
//     setPlayerState("main");

//     // Apply transition styles
//     if (miniContainerRef.current) {
//       // miniContainerRef.current.style.transform = "translate(100%, 100%)";
//       miniContainerRef.current.style.opacity = "0";
//     }
//   }, [playerState]);

//   const close = useCallback(() => {
//     if (!videoRef.current) return;

//     videoRef.current.pause();
//     videoRef.current.currentTime = 0;
//     setIsPlaying(false);
//     restore();
//   }, [restore]);

//   // Video element that will be reparented
//   const videoElement = [
//     <video
//       key={111}
//       ref={videoRef}
//       src={videoUrl}
//       className="w-full h-full object-contain"
//       onClick={handlePlayPause}
//       controls={true}
//     />]

//   return (
//     <div className="relative">
//       {/* Main Player */}
//       <div
//         ref={mainContainerRef}
//         className={`w-full aspect-video bg-black relative transition-all duration-300
//           ${playerState === "mini" ? "opacity-0 pointer-events-none transform " : "opacity-100"}`}
//       >
//         <Reparentable id="main">
//           {playerState === "main" ? videoElement : []}
//         </Reparentable>

//         <button
//           onClick={minimize}
//           className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full
//             hover:bg-black/70 transition-colors z-50"
//         >
//           <Minimize2 className="w-5 h-5 text-white" />
//         </button>
//       </div>

//       {/* Mini Player */}
//       <div
//         ref={miniContainerRef}
//         className={`
//           fixed bottom-4 right-4 w-80 h-44 bg-black shadow-lg rounded-lg overflow-hidden
//           transition-all duration-200 ease-in-out
//           ${
//             playerState === "mini"
//               ? "opacity-100 transform translate-y-0 pointer-events-auto"
//               : "opacity-0 transform -translate-y-20 pointer-events-none"
//           }
//         `}
//       >
//         <Reparentable id="mini">
//           {playerState === "mini" ? videoElement : []}
//         </Reparentable>

//         <div
//           className="absolute top-0 right-0 flex gap-1 p-2
//           bg-gradient-to-b from-black/50 to-transparent w-full z-50"
//         >
//           <button
//             onClick={restore}
//             className="p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
//           >
//             <Maximize2 className="w-4 h-4 text-white" />
//           </button>
//           <button
//             onClick={close}
//             className="p-1 hover:bg-white/20 rounded transition-colors"
//           >
//             <X className="w-4 h-4 text-white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;

// dog shit
// import React, { useEffect, useState } from "react";
// import { VideoProvider } from "./videoProvider";
// import { useVideoContext } from "./context";
// import { VideoTargetProps } from "./types/types";

//  const VideoTarget: React.FC<VideoTargetProps> = ({
//   id,
//   position = "main",
// }) => {
//   const { requestVideo, releaseVideo } = useVideoContext();

//   useEffect(() => {
//     requestVideo(id, position);
//     return () => releaseVideo(id);
//   }, [id, position, requestVideo, releaseVideo]);

//   return (
//     <div
//       id={id}
//       className={`
//         ${
//           position === "mini"
//             ? "fixed bottom-4 right-4 w-64 h-36 shadow-lg rounded-lg overflow-hidden"
//             : "w-full h-96"
//         }
//       `}
//     />
//   );
// };

//  const VideoPage: React.FC = () => {
//   const [isMinimized, setIsMinimized] = useState(false);

//   return (
//     <VideoProvider>
//       <div className="p-4">
//         <button
//           onClick={() => setIsMinimized(!isMinimized)}
//           className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         >
//           {isMinimized ? "Maximize" : "Minimize"}
//         </button>

//         {!isMinimized ? (
//           <div className="w-full">
//             <VideoTarget id="main-video" position="main" />
//           </div>
//         ) : (
//           <VideoTarget id="mini-video" position="mini" />
//         )}
//       </div>
//     </VideoProvider>
//   );
// };

// export default VideoPage;

// works as same as other with toon of more complexity
// import  { useState, useRef, useEffect } from "react";
// import { createPortal } from "react-dom";
// import { X, Maximize2, Minimize2 } from "lucide-react";

// const VideoPortalPlayer = ({ videoUrl }: { videoUrl: string }) => {
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const videoWrapperRef = useRef<HTMLDivElement>(null);
//   const portalContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     console.log(`isPlaying`, isPlaying);
//   }, [isPlaying]);

//   // Create portal container on mount
//   useEffect(() => {
//     const portalDiv = document.createElement("div");
//     portalDiv.id = "video-portal-container";
//     portalDiv.style.position = "fixed";
//     portalDiv.style.bottom = "1rem";
//     portalDiv.style.right = "1rem";
//     portalDiv.style.zIndex = "50";
//     portalDiv.style.width = "320px";
//     portalDiv.style.height = "180px";
//     portalDiv.style.backgroundColor = "black";
//     portalDiv.style.borderRadius = "0.5rem";
//     portalDiv.style.overflow = "hidden";
//     portalDiv.style.boxShadow = "0 4px 6px -1px rgb(0 0 0 / 0.1)";
//     portalDiv.style.opacity = "0";
//     portalDiv.style.transition = "opacity 0.2s ease-in-out";
//     portalDiv.style.pointerEvents = "none";

//     document.body.appendChild(portalDiv);
//     portalContainerRef.current = portalDiv;

//     return () => {
//       document.body.removeChild(portalDiv);
//     };
//   }, []);

//   // Handle play state
//   const handlePlayPause = () => {
//     if (!videoRef.current) return;

//     if (videoRef.current.paused) {
//       const playPromise = videoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(() => setIsPlaying(false));
//       }
//     } else {
//       videoRef.current.pause();
//     }
//   };

//   // Watch video play state
//   useEffect(() => {
//     if (!videoRef.current) return;

//     const video = videoRef.current;
//     const handleVideoPlay = () => setIsPlaying(true);
//     const handleVideoPause = () => setIsPlaying(false);

//     video.addEventListener("play", handleVideoPlay);
//     video.addEventListener("pause", handleVideoPause);

//     return () => {
//       video.removeEventListener("play", handleVideoPlay);
//       video.removeEventListener("pause", handleVideoPause);
//     };
//   }, []);

//   const minimize = () => {
//     console.log(`minimize`);

//     if (!videoRef.current || !portalContainerRef.current) return;

//     portalContainerRef.current.style.pointerEvents = "auto";

//     const video = videoRef.current;
//     const currentTime = video.currentTime;
//     const wasPlaying = !video.paused;

//     // Show portal container before transition
//     portalContainerRef.current.style.opacity = "1";

//     // Set minimized state which will trigger reparenting
//     setIsMinimized(true);

//     // Ensure video state is maintained after reparenting
//     requestAnimationFrame(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = currentTime;
//         if (wasPlaying) {
//           const playPromise = videoRef.current.play();
//           if (playPromise !== undefined) {
//             playPromise.catch(() => setIsPlaying(false));
//           }
//         }
//       }
//     });
//   };

//   const restore = () => {
//     if (!videoRef.current || !portalContainerRef.current) return;
//         portalContainerRef.current.style.pointerEvents = "none";

//     const video = videoRef.current;
//     const currentTime = video.currentTime;
//     const wasPlaying = !video.paused;

//     // Hide portal container
//     portalContainerRef.current.style.opacity = "0";

//     // Set minimized state which will trigger reparenting back
//     setIsMinimized(false);

//     // Ensure video state is maintained after reparenting
//     requestAnimationFrame(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = currentTime;
//         if (wasPlaying) {
//           const playPromise = videoRef.current.play();
//           if (playPromise !== undefined) {
//             playPromise.catch(() => setIsPlaying(false));
//           }
//         }
//       }
//     });
//   };

//   const close = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//     }
//     setIsMinimized(false);
//     setIsPlaying(false);
//   };

//   // Video content with controls
//   const VideoContent = (
//     <div className="relative w-full h-full">
//       <video
//         ref={videoRef}
//         src={videoUrl}
//         className="w-full h-full object-contain"
//         onClick={handlePlayPause}
//         controls={!isMinimized}
//       />
//       {isMinimized ? (
//         <div className="absolute top-0 right-0 flex gap-1 p-2 bg-gradient-to-b from-black/50 to-transparent w-full">
//           <button
//             onClick={restore}
//             className="p-1 hover:bg-white/20 rounded transition-colors"
//           >
//             <Maximize2 className="w-4 h-4 text-white" />
//           </button>
//           <button
//             onClick={close}
//             className="p-1 hover:bg-white/20 rounded transition-colors"
//           >
//             <X className="w-4 h-4 text-white" />
//           </button>
//         </div>
//       ) : (
//         <button
//           onClick={minimize}
//           className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
//         >
//           <Minimize2 className="w-5 h-5 text-white" />
//         </button>
//       )}
//     </div>
//   );

//   return (
//     <>
//       {/* Main player container */}
//       {!isMinimized && (
//         <div
//           ref={videoWrapperRef}
//           className="w-full aspect-video bg-black relative"
//         >
//           {VideoContent}
//         </div>
//       )}

//       {/* Portaled mini player */}
//       {isMinimized &&
//         portalContainerRef.current &&
//         createPortal(VideoContent, portalContainerRef.current)}
//     </>
//   );
// };

// export default VideoPortalPlayer;

// const VideoPortalPlayer = ({ videoUrl }: { videoUrl: string }) => {
//   const [isMinimized, setIsMinimized] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isMiniPlaying, setIsMiniPlaying] = useState(false);
//   const mainVideoRef = useRef<HTMLVideoElement>(null);
//   const miniVideoRef = useRef<HTMLVideoElement>(null);
//   const miniPlayerContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     console.log(`isPlaying`, isPlaying);
//     console.log(`isMiniPlaying`, isMiniPlaying);
//   }, [isMiniPlaying, isPlaying]);

//   // Handle play state
//   const handlePlayPauseMain = () => {
//     if (!mainVideoRef.current) return;

//     if (mainVideoRef.current.paused) {
//       const playPromise = mainVideoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(() => setIsPlaying(false));
//       }
//     } else {
//       mainVideoRef.current.pause();
//     }
//   };
//   const handlePlayPauseMini = () => {
//     if (!miniVideoRef.current) return;

//     if (miniVideoRef.current.paused) {
//       const playPromise = miniVideoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(() => setIsPlaying(false));
//       }
//     } else {
//       miniVideoRef.current.pause();
//     }
//   };

//   // Watch video play state
//   useEffect(() => {
//     if (!mainVideoRef.current) return;

//     const mainVideo = mainVideoRef.current;
//     const handleVideoPlay = () => setIsPlaying(true);
//     const handleVideoPause = () => setIsPlaying(false);

//     mainVideo.addEventListener("play", handleVideoPlay);
//     mainVideo.addEventListener("pause", handleVideoPause);

//     const miniVideo = miniVideoRef.current;
//     const handleMiniVideoPlay = () => setIsMiniPlaying(true);
//     const handleMiniVideoPause = () => setIsMiniPlaying(false);

//     miniVideo?.addEventListener("play", handleMiniVideoPlay);
//     miniVideo?.addEventListener("pause", handleMiniVideoPause);

//     return () => {
//       mainVideo.removeEventListener("play", handleVideoPlay);
//       mainVideo.removeEventListener("pause", handleVideoPause);

//       mainVideo?.removeEventListener("play", handleMiniVideoPlay);
//       mainVideo?.removeEventListener("pause", handleMiniVideoPause);
//     };
//   }, []);

//   const minimize = () => {
//     if (
//       !mainVideoRef.current ||
//       !miniVideoRef.current ||
//       !miniPlayerContainerRef.current
//     )
//       return;

//     console.log("here");

//     // Set up mini player
//     const currentTime = mainVideoRef.current.currentTime;
//     const wasPlaying = !mainVideoRef.current.paused;
//     miniVideoRef.current.currentTime = currentTime;

//     // Pause main video
//     mainVideoRef.current.pause();

//     // Show mini player container
//     miniPlayerContainerRef.current.style.opacity = "100";
//     console.log(`opacity`);
//     console.log(wasPlaying);
//     // Restore play state in mini player
//     if (wasPlaying) {
//       console.log("here");
//       const playPromise = miniVideoRef.current.play();
//       console.log(`playPromise`, playPromise);

//       if (playPromise !== undefined) {
//         playPromise.catch(() => setIsPlaying(false));
//       }
//     }

//     // Set minimized state
//     setIsMinimized(true);
//   };

//   const restore = () => {
//     if (
//       !mainVideoRef.current ||
//       !miniVideoRef.current ||
//       !miniPlayerContainerRef.current
//     )
//       return;

//       // Restore main video
//       const currentTime = miniVideoRef.current.currentTime;
//       const wasPlaying = !miniVideoRef.current.paused;
//       mainVideoRef.current.currentTime = currentTime;

//       // Pause mini player
//       miniVideoRef.current.pause();

//     // Hide mini player container
//     miniPlayerContainerRef.current.style.opacity = "0";

//     // Restore play state in main player
//     if (wasPlaying) {
//       const playPromise = mainVideoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(() => setIsPlaying(false));
//       }
//     }

//     // Set minimized state
//     setIsMinimized(false);
//   };

//   const close = () => {
//     if (mainVideoRef.current) {
//       mainVideoRef.current.pause();
//       mainVideoRef.current.currentTime = 0;
//     }
//     if (miniVideoRef.current) {
//       miniVideoRef.current.pause();
//       miniVideoRef.current.currentTime = 0;
//     }
//     setIsMinimized(false);
//     setIsPlaying(false);
//   };

//   return (
//     <div className="relative">
//       {/* Main Player */}
//       <div
//         className={`w-full aspect-video bg-black relative ${
//           isMinimized ? " opacity-0" : ""
//         }`}
//       >
//         <video
//           ref={mainVideoRef}
//           src={videoUrl}
//           className="w-full h-full object-contain"
//           onClick={handlePlayPauseMain}
//           controls={true}
//         />
//         <button
//           onClick={minimize}
//           className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
//         >
//           <Minimize2 className="w-5 h-5 text-white" />
//         </button>
//       </div>

//       {/* Mini Player */}
//       <div
//         ref={miniPlayerContainerRef}
//         className={`
//           fixed bottom-4 right-4 w-80 h-44 bg-black shadow-lg rounded-lg overflow-hidden
//           transition-all duration-300 ease-in-out
//           ${isMinimized ? "opacity-100" : "opacity-0 pointer-events-none"}
//         `}
//       >
//         <video
//           ref={miniVideoRef}
//           src={videoUrl}
//           className="w-full h-full object-contain"
//           onClick={handlePlayPauseMini}
//           controls={true}
//         />
//         <div className="absolute top-0 right-0 flex gap-1 p-2 bg-gradient-to-b from-black/50 to-transparent w-full">
//           <button
//             onClick={restore}
//             className="p-1 hover:bg-white/20 rounded transition-colors"
//           >
//             <Maximize2 className="w-4 h-4 text-white" />
//           </button>
//           <button
//             onClick={close}
//             className="p-1 hover:bg-white/20 rounded transition-colors"
//           >
//             <X className="w-4 h-4 text-white" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPortalPlayer;

// import { useState, useRef, useEffect, useCallback } from "react";
// import { X, Maximize2, Minimize2 } from "lucide-react";

// const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
//   const [isMinimized, setIsMinimized] = useState<boolean>(false);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const mainContainerRef = useRef<HTMLDivElement>(null);

//   // Handle play state changes
//   const handlePlayPause = useCallback(() => {
//     if (!videoRef.current) return;

//     if (videoRef.current.paused) {
//       const playPromise = videoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(() => {
//           setIsPlaying(false);
//         });
//       }
//     } else {
//       videoRef.current.pause();
//     }
//   }, []);

//   // Watch video play state
//   useEffect(() => {
//     if (!videoRef.current) return;

//     const video = videoRef.current;
//     const handleVideoPlay = () => setIsPlaying(true);
//     const handleVideoPause = () => setIsPlaying(false);

//     video.addEventListener("play", handleVideoPlay);
//     video.addEventListener("pause", handleVideoPause);

//     return () => {
//       video.removeEventListener("play", handleVideoPlay);
//       video.removeEventListener("pause", handleVideoPause);
//     };
//   }, []);

//   const minimize = useCallback(() => {
//     if (!videoRef.current) return;

//     // Store current time and play state before minimizing
//     const currentTime = videoRef.current.currentTime;
//     const wasPlaying = !videoRef.current.paused;

//     setIsMinimized(true);

//     // Use requestAnimationFrame to ensure DOM updates before continuing playback
//     requestAnimationFrame(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = currentTime;
//         if (wasPlaying) {
//           const playPromise = videoRef.current.play();
//           if (playPromise !== undefined) {
//             playPromise.catch(() => {
//               setIsPlaying(false);
//             });
//           }
//         }
//       }
//     });
//   }, []);

//   const restore = useCallback(() => {
//     if (!videoRef.current) return;

//     // Store current time and play state before restoring
//     const currentTime = videoRef.current.currentTime;
//     const wasPlaying = !videoRef.current.paused;

//     setIsMinimized(false);

//     // Use requestAnimationFrame to ensure DOM updates before continuing playback
//     requestAnimationFrame(() => {
//       if (videoRef.current) {
//         videoRef.current.currentTime = currentTime;
//         mainContainerRef.current?.scrollIntoView({ behavior: "smooth" });

//         if (wasPlaying) {
//           const playPromise = videoRef.current.play();
//           if (playPromise !== undefined) {
//             playPromise.catch(() => {
//               setIsPlaying(false);
//             });
//           }
//         }
//       }
//     });
//   }, []);

//   const close = useCallback(() => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//     }
//     setIsMinimized(false);
//     setIsPlaying(false);
//   }, []);

//   return (
//     <div className="relative">
//       {/* Main Player Container */}
//       {!isMinimized && (
//         <div
//           ref={mainContainerRef}
//           className="w-full aspect-video bg-black relative"
//         >
//           <video
//             ref={videoRef}
//             src={videoUrl}
//             className="w-full h-full object-contain"
//             onClick={handlePlayPause}
//             controls
//           />
//           <button
//             onClick={minimize}
//             className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
//           >
//             <Minimize2 className="w-5 h-5 text-white" />
//           </button>
//         </div>
//       )}

//       {/* Mini Player */}
//       {isMinimized && (
//         <div
//           className="fixed bottom-4 right-4 bg-black shadow-lg rounded-lg overflow-hidden transition-transform"
//           style={{
//             width: "320px",
//             height: "180px",
//             zIndex: 50,
//           }}
//         >
//           <video
//             ref={videoRef}
//             src={videoUrl}
//             className="w-full h-full object-contain"
//             onClick={handlePlayPause}
//           />

//           {/* Mini Player Controls */}
//           <div className="absolute top-0 right-0 flex gap-1 p-2 bg-gradient-to-b from-black/50 to-transparent w-full">
//             <button
//               onClick={restore}
//               className="p-1 hover:bg-white/20 rounded transition-colors"
//             >
//               <Maximize2 className="w-4 h-4 text-white" />
//             </button>
//             <button
//               onClick={close}
//               className="p-1 hover:bg-white/20 rounded transition-colors"
//             >
//               <X className="w-4 h-4 text-white" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;

// import { useState, useRef, useEffect, useCallback } from "react";
// import { X, Maximize2, Minimize2 } from "lucide-react";

// // type Position = { x: number; y: number };

// const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
//   const [isMinimized, setIsMinimized] = useState<boolean>(false);
//   const [isPlaying, setIsPlaying] = useState<boolean>(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const mainContainerRef = useRef<HTMLDivElement>(null);
//   //   const [position, setPosition] = useState<Position>({ x: 20, y: 20 });

//   // Handle play state changes
//   const handlePlayPause = useCallback(() => {
//     if (!videoRef.current) return;

//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       const playPromise = videoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(() => {
//           // Handle autoplay restrictions
//           setIsPlaying(false);
//         });
//       }
//     }
//   }, [isPlaying]);

//   const restore = useCallback(() => {
//     const wasPlaying = !videoRef.current?.paused;
//     setIsMinimized(false);
//     mainContainerRef.current?.scrollIntoView({ behavior: "smooth" });

//     // Maintain play state after restoring
//     if (wasPlaying && videoRef.current) {
//       const playPromise = videoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(() => {
//           setIsPlaying(false);
//         });
//       }
//     }
//   }, []);

//   const close = useCallback(() => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//     }
//     setIsMinimized(false);
//     setIsPlaying(false);
//   }, []);

//   useEffect(() => {
//     console.log(`isPlaying`, isPlaying);
//     console.log(`isMinimized`, isMinimized);
//     console.log(`videoRef.current paused`, videoRef.current?.paused);
//     console.log(`videoRef.current played`, videoRef.current?.played);
//   },[isMinimized, isPlaying])

//   useEffect(() => {
//     if (!videoRef.current) return;

//     const video = videoRef.current;
//     const handleVideoPlay = () => setIsPlaying(true);
//     const handleVideoPause = () => setIsPlaying(false);

//     video.addEventListener("play", handleVideoPlay);
//     video.addEventListener("pause", handleVideoPause);

//     return () => {
//       video.removeEventListener("play", handleVideoPlay);
//       video.removeEventListener("pause", handleVideoPause);
//     };
//   }, []);

//   const minimize = useCallback(() => {
//     const wasPlaying = !videoRef.current?.paused;
//     setIsMinimized(true);
//     videoRef.current?.play()

//     // Maintain play state after minimizing
//     if (wasPlaying && videoRef.current) {
//       const playPromise = videoRef.current.play();
//       if (playPromise !== undefined) {
//         playPromise.catch(() => {
//           setIsPlaying(false);
//         });
//       }
//     }
//   }, []);

//   return (
//     <div className="relative">
//       {/* Main Player Container */}
//       {!isMinimized && (
//         <div
//           ref={mainContainerRef}
//           className={`w-full aspect-video bg-black relative ${
//             isMinimized ? "hidden" : ""
//           }`}
//         >
//           <video
//             ref={videoRef}
//             src={videoUrl}
//             className="w-full h-full object-contain"
//             onClick={handlePlayPause}
//             controls
//           />
//           <button
//             onClick={minimize}
//             className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
//           >
//             <Minimize2 className="w-5 h-5 text-white" />
//           </button>
//         </div>
//       )}

//       {/* Mini Player */}
//       {isMinimized && (
//         <div
//           className="fixed bg-black shadow-lg rounded-lg overflow-hidden transition-transform cursor-move"
//           style={{
//             width: "320px",
//             height: "180px",
//             // right: `${position.x}px`,
//             // bottom: `${position.y}px`,
//             zIndex: 50,
//           }}
//           //   onMouseMove={handleMiniPlayerMove}
//         >
//           <video
//             ref={videoRef}
//             src={videoUrl}
//             className="w-full h-full object-contain"
//             onClick={handlePlayPause}
//             onLoad={() => videoRef.current?.play()}
//           />

//           {/* Mini Player Controls */}
//           <div className="absolute top-0 right-0 flex gap-1 p-2 bg-gradient-to-b from-black/50 to-transparent w-full">
//             <button
//               onClick={restore}
//               className="p-1 hover:bg-white/20 rounded transition-colors"
//             >
//               <Maximize2 className="w-4 h-4 text-white" />
//             </button>
//             <button
//               onClick={close}
//               className="p-1 hover:bg-white/20 rounded transition-colors"
//             >
//               <X className="w-4 h-4 text-white" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;
