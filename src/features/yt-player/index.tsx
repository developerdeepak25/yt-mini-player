import VideoPlayer from "./Player";

// Example usage
export default function YtPlayer() {
  console.log(`YtPlayer`, 'YtPlayer');
  return (
    <div className="w-full mx-auto p-4">
      <VideoPlayer videoUrl="./screen-capture-_4_.mp4" />
      {/* <VideoPlayer2 videoUrl="./screen-capture-_4_.mp4" /> */}
      {/* <VideoPlayer  /> */}
      {/* Other content */}
    </div>
  );
}
