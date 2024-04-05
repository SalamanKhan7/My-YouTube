import React from "react";
import "../index.css";

const VideoCard = ({ info }) => {
  const { snippet } = info;
  const { thumbnails, title, channelTitle } = snippet;
  return (
    <div className="p-2 m-1 w-72 shadow-lg h-80 rounded-lg -z-50 hover:border ">
      <img
        className="rounded-lg"
        alt="thumbnails"
        src={thumbnails?.medium?.url}
      />
      <ul>
        <li className="font-bold py-1 flex ">
          <img
            className="rounded-full h-8 w-8 items-start mr-2"
            alt="thumbnails"
            src={thumbnails?.medium?.url}
          />
          {title}
        </li>
        <li className="px-5 ml-5 ">{channelTitle}</li>
      </ul>
    </div>
  );
};

export default VideoCard;
