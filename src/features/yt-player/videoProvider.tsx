// import React, { useRef, useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import { VideoContainerProps, VideoProviderProps, VideoStackItem } from "./types/types";
// import { VideoContext } from "./context";



// const VideoContainer: React.FC<VideoContainerProps> = ({ children }) => {
//   return <div className="w-full h-full">{children}</div>;
// };

// export const VideoProvider: React.FC<VideoProviderProps> = ({ children }) => {
//   const [videoStack, setVideoStack] = useState<VideoStackItem[]>([]);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const portalContainerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (!portalContainerRef.current) {
//       const div = document.createElement("div");
//       div.style.height = "100%";
//       portalContainerRef.current = div;
//       document.body.appendChild(div);
//     }

//     return () => {
//       if (portalContainerRef.current) {
//         document.body.removeChild(portalContainerRef.current);
//       }
//     };
//   }, []);

//   const requestVideo = (targetId: string, position: "main" | "mini") => {
//     setVideoStack((stack) => {
//       const newStack = stack.filter((item) => item.targetId !== targetId);
//       return [...newStack, { targetId, position }];
//     });
//   };

//   const releaseVideo = (targetId: string) => {
//     setVideoStack((stack) =>
//       stack.filter((item) => item.targetId !== targetId)
//     );
//   };

//   const currentTarget = videoStack[videoStack.length - 1];

//   const videoPortal =
//     portalContainerRef.current &&
//     createPortal(
//       <VideoContainer>
//         <video ref={videoRef} className="w-full h-full" controls playsInline>
//           <source src="/api/placeholder/400/320" type="video/mp4" />
//         </video>
//       </VideoContainer>,
//       portalContainerRef.current
//     );

//   return (
//     <VideoContext.Provider value={{ requestVideo, releaseVideo, videoRef }}>
//       {videoPortal}

//       {currentTarget &&
//         portalContainerRef.current &&
//         document.getElementById(currentTarget.targetId) &&
//         createPortal(
//           <VideoContainer>{portalContainerRef.current}</VideoContainer>,
//           document?.getElementById?.(currentTarget.targetId)
//         )}

//       {children}
//     </VideoContext.Provider>
//   );
// };
