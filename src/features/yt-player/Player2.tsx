// // import { Maximize2, Minimize2, X } from "lucide-react";
// // import React, {
// //   useState,
// //   useEffect,
// //   useCallback,
// //   createContext,
// //   useContext,
// //   useRef,
// // } from "react";

// // // Context to manage portal state
// // const PortalContext = createContext(null);

// // // Provider component that manages portal instances
// // const PortalProvider = ({ children }) => {
// //   const [portals, setPortals] = useState(new Map());

// //   const registerPortal = useCallback((key, element) => {
// //     setPortals((prev) => {
// //       const newMap = new Map(prev);
// //       newMap.set(key, element);
// //       return newMap;
// //     });
// //   }, []);

// //   const unregisterPortal = useCallback((key) => {
// //     setPortals((prev) => {
// //       const newMap = new Map(prev);
// //       newMap.delete(key);
// //       return newMap;
// //     });
// //   }, []);

// //   return (
// //     <PortalContext.Provider
// //       value={{ portals, registerPortal, unregisterPortal }}
// //     >
// //       {children}
// //     </PortalContext.Provider>
// //   );
// // };

// // // Hook to access portal context
// // const usePortal = () => {
// //   const context = useContext(PortalContext);
// //   if (!context) {
// //     throw new Error("usePortal must be used within a PortalProvider");
// //   }
// //   return context;
// // };

// // // Portal In component - where content originates
// // const PortalIn = ({ children, portalKey }: { children: React.ReactNode; portalKey: string }) => {
// //   const { registerPortal, unregisterPortal } = usePortal();

// //   useEffect(() => {
// //     registerPortal(portalKey, children);
// //     return () => unregisterPortal(portalKey);
// //   }, [portalKey, children, registerPortal, unregisterPortal]);

// //   return null;
// // };

// // // Portal Out component - where content is rendered
// // const PortalOut = ({ portalKey }) => {
// //   const { portals } = usePortal();
// //   const content = portals.get(portalKey);

// //   return <div className="portal-out">{content || null}</div>;
// // };




// // interface VideoPlayerProps {
// //   videoUrl: string;
// // }

// // const VideoPlayer2 = ({ videoUrl }: VideoPlayerProps) => {
// //   // States
// //   const [playerState, setPlayerState] = useState<"main" | "mini">("main");
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   console.log("🚀 ~ VideoPlayer2 ~ isPlaying:", isPlaying);

// //   // Create HTML portal node for the video element
// // //   const portalNode = useRef();

// //   // Refs for containers
// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const miniContainerRef = useRef<HTMLDivElement>(null);

// //   // Initialize portal node
// //   // useEffect(() => {
// //   //   portalNode.current.mount();
// //   //   return () => {
// //   //     portalNode.current.unmount();
// //   //   };
// //   // }, []);

// //   // Handle play state changes
// //   const handlePlayPause = useCallback(() => {
// //     if (!videoRef.current) return;

// //     if (videoRef.current.paused) {
// //       const playPromise = videoRef.current.play();
// //       if (playPromise !== undefined) {
// //         playPromise
// //           .then(() => setIsPlaying(true))
// //           .catch(() => setIsPlaying(false));
// //       }
// //     } else {
// //       videoRef.current.pause();
// //       setIsPlaying(false);
// //     }
// //   }, []);

// //   // Watch video play state
// //   useEffect(() => {
// //     if (!videoRef.current) return;

// //     const video = videoRef.current;
// //     const handlePlay = () => setIsPlaying(true);
// //     const handlePause = () => setIsPlaying(false);

// //     video.addEventListener("play", handlePlay);
// //     video.addEventListener("pause", handlePause);

// //     return () => {
// //       video.removeEventListener("play", handlePlay);
// //       video.removeEventListener("pause", handlePause);
// //     };
// //   }, []);

// //   const minimize = useCallback(() => {
// //     if (playerState === "mini") return;
// //     setPlayerState("mini");

// //     if (miniContainerRef.current) {
// //       miniContainerRef.current.style.opacity = "1";
// //     }
// //   }, [playerState]);

// //   const restore = useCallback(() => {
// //     if (playerState === "main") return;
// //     setPlayerState("main");

// //     if (miniContainerRef.current) {
// //       miniContainerRef.current.style.opacity = "0";
// //     }
// //   }, [playerState]);

// //   const close = useCallback(() => {
// //     if (!videoRef.current) return;
// //     videoRef.current.pause();
// //     videoRef.current.currentTime = 0;
// //     setIsPlaying(false);
// //     restore();
// //   }, [restore]);
// //   const videoElement = (
// //     // <InPortal node={portalNode.current}>
// //     <video
// //       // key={111}
// //       ref={videoRef}
// //       src={videoUrl}
// //       className="w-full h-full object-contain"
// //       onClick={handlePlayPause}
// //       controls={true}
// //     />
// //     // </InPortal>
// //   );

// // //   const { portals } = usePortal();

// //   return (
// //     <PortalProvider>
// //       <div className="relative">
// //         {/* Portal Source */}
// //         <PortalIn portalKey="example-portal">
// //           {/* <video
// //           ref={videoRef}
// //           src={videoUrl}
// //           className="w-full h-full object-contain"
// //           onClick={handlePlayPause}
// //           controls={true}
// //         /> */}
// //           {videoElement}
// //         </PortalIn>

// //         {/* Main Player */}
// //         <div
// //           className={`w-full aspect-video bg-black relative transition-all duration-300
// //           ${
// //             playerState === "mini"
// //               ? "opacity-0 pointer-events-none transform"
// //               : "opacity-100"
// //           }`}
// //         >
// //           {playerState === "main" && <PortalOut portalKey="example-portal" />}
// //           {/* {playerState === "main" && videoElement } */}

// //           <button
// //             onClick={minimize}
// //             className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full 
// //             hover:bg-black/70 transition-colors z-50"
// //           >
// //             <Minimize2 className="w-5 h-5 text-white" />
// //           </button>
// //         </div>

// //         {/* Mini Player */}
// //         <div
// //           ref={miniContainerRef}
// //           className={`
// //           fixed bottom-4 right-4 w-80 h-44 bg-black shadow-lg rounded-lg overflow-hidden
// //           transition-all duration-200 ease-in-out
// //           ${
// //             playerState === "mini"
// //               ? "opacity-100 transform translate-y-0 pointer-events-auto"
// //               : "opacity-0 transform -translate-y-20 pointer-events-none"
// //           }
// //         `}
// //         >
// //           {playerState === "mini" && <PortalOut portalKey="example-portal" />}

// //           <div
// //             className="absolute top-0 right-0 flex gap-1 p-2 
// //           bg-gradient-to-b from-black/50 to-transparent w-full z-50"
// //           >
// //             <button
// //               onClick={restore}
// //               className="p-1 hover:bg-white/20 rounded transition-colors cursor-pointer"
// //             >
// //               <Maximize2 className="w-4 h-4 text-white" />
// //             </button>
// //             <button
// //               onClick={close}
// //               className="p-1 hover:bg-white/20 rounded transition-colors"
// //             >
// //               <X className="w-4 h-4 text-white" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </PortalProvider>
// //   );
// // };

// // export default VideoPlayer2;


// import  { useState, useRef, useEffect, useCallback } from "react";
// import { X } from "lucide-react";

// // Hidden container to store rendered content
// const HIDDEN_CONTAINER_ID = "portal-container";

// const VideoPlayer2 = ({ videoUrl }) => {
//   const [minimized, setMinimized] = useState(false);
//   const videoRef = useRef(null);
//   const sourceContainerRef = useRef(null);
//   const targetContainerRef = useRef(null);
//   const hiddenContainerRef = useRef(null);

//   // Initialize hidden container
//   useEffect(() => {
//     const container = document.createElement("div");
//     container.id = HIDDEN_CONTAINER_ID;
//     container.style.display = "none";
//     document.body.appendChild(container);
//     hiddenContainerRef.current = container;

//     return () => {
//       if (container.parentNode) {
//         document.body.removeChild(container);
//       }
//     };
//   }, []);

//   const transferVideo = useCallback((from, to) => {
//     console.log(`transferVideo`, from, to, videoRef.current);
    
//     if (!from || !to || !videoRef.current) return;

//     // Store the video element in hidden container during transition
//     const hiddenContainer = hiddenContainerRef.current;
//     if (hiddenContainer && videoRef.current.parentNode === from) {
//       hiddenContainer.appendChild(videoRef.current);
//     }

//     // Move video to new container
//     if (videoRef.current.parentNode !== to) {
//       to.appendChild(videoRef.current);
//     }
//   }, []);

// useEffect(() => {
//   console.log("videoRef.current", videoRef.current);
// }, [videoRef.current]);
//   useEffect(() => {
//     if (!sourceContainerRef.current || !targetContainerRef.current) return;

//     if (minimized) {
//       transferVideo(sourceContainerRef.current, targetContainerRef.current);
//     } else {
//       transferVideo(targetContainerRef.current, sourceContainerRef.current);
//     }
//   }, [minimized, transferVideo]);

//   return (
//     <div className="w-full min-h-screen bg-gray-100 p-4">
//       {/* Main content area */}
//       <div className="max-w-4xl mx-auto">
//         <div
//           ref={sourceContainerRef}
//           className={`relative bg-black rounded-lg overflow-hidden transition-all duration-300
//             ${minimized ? "h-0" : "h-[480px]"}`}
//         >
//           {!minimized && (
//             <video
//               ref={videoRef}
//               className="w-full h-full object-cover"
//               controls
//               src={videoUrl}
//               autoPlay
//             />
//           )}
//         </div>

//         {/* Video info and content below */}
//         <div className="mt-4">
//           <h1 className="text-2xl font-bold">Video Title</h1>
//           <p className="mt-2 text-gray-600">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//         </div>

//         <button
//           onClick={() => setMinimized(true)}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Minimize Video
//         </button>
//       </div>

//       {/* Mini player */}
//       <div
//         className={`fixed bottom-4 right-4 transition-all duration-300 transform
//           ${minimized ? "translate-y-0" : "translate-y-full"}`}
//       >
//         <div
//           ref={targetContainerRef}
//           className="relative bg-black rounded-lg overflow-hidden shadow-lg"
//           style={{ width: "320px", height: "180px" }}
//         >
//           {minimized && videoRef.current && (
//             <button
//               onClick={() => setMinimized(false)}
//               className="absolute top-2 right-2 z-10 p-1 bg-black/50 rounded-full 
//                 hover:bg-black/70 text-white"
//             >
//               <X size={20} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer2;