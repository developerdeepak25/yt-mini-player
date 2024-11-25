import { NavLink } from "react-router-dom";

const videoList = [
  {
    id: "1a2b3c",
    title: "Inspirational Highlights",
    path: "/public/6959285-sd_640_360_25fps.mp4",
  },
  {
    id: "2d3e4f",
    title: "Adventure Moments",
    path: "/public/7346214-sd_720_540_25fps.mp4",
  },
  {
    id: "3g4h5i",
    title: "City Walkthrough",
    path: "/public/12488488_640_360_30fps.mp4",
  },
  {
    id: "4j5k6l",
    title: "Documentary Preview",
    path: "/public/18921613-sd_640_360_30fps.mp4",
  },
  {
    id: "5m6n7o",
    title: "Screen Recording",
    path: "/public/screen-capture-_4.mp4",
  },
  {
    id: "6p7q8r",
    title: "Project Recap",
    path: "/public/Untitled video - Made with Clipchamp.mp4",
  },
  {
    id: "7s8t9u",
    title: "Daily Vlog Highlights",
    path: "/public/12488488_640_360_30fps.mp4",
  },
  {
    id: "8v9w0x",
    title: "Nature Clips",
    path: "/public/6959285-sd_640_360_25fps.mp4",
  },
  {
    id: "9y0z1a",
    title: "Tech Demo",
    path: "/public/18921613-sd_640_360_30fps.mp4",
  },
];

const Feed = () => {
  return (
    <div className="flex w-full h-full flex-col">
      <div className="grid grid-cols-3 gap-6">
        {videoList.map((video) => (
          <VideoImage key={video.id} id={video.id} title={video.title} />
        ))}
      </div>
    </div>
  );
};

const VideoImage = ({
  id,
  //   url,
  title,
}: {
  id: string;
  //   url: string;
  title: string;
}) => {
  return (
    <NavLink to={`/player/${id}`}>
      <div className=" bg-black h-[250px] flex flex-col text-white rounded-lg overflow-hidden">
        <div className=" bg-[#111] grow grid items-center">
          <div>{id}</div>
        </div>
        <div className="h-12 grid items-center">

        <h2>{title}</h2>
        </div>
      </div>
    </NavLink>
  );
};

export default Feed;
