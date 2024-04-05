import React from "react";
const SidebarCard = ({ info }) => {
  const { snippet } = info;
  const { thumbnails, title, channelTitle } = snippet;
  return (
    <div className="p-2 w-96 shadow-lg h-44 rounded-lg  flex justify-center mr-6 mt-2 hover:border">
      <img
        className="rounded-lg h-40 w-44"
        alt="thumbnails"
        src={thumbnails?.medium?.url}
      />
      <ul>
        <li className="font-bold pl-1 flex ">{title}</li>
        <li className="pl-1  ">{channelTitle}</li>
      </ul>
    </div>
  );
};

export default SidebarCard;
