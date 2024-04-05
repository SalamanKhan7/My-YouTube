import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  if (!isMenuOpen) return null;

  return (
    <div className="w-40  h-lvh mt-16 fixed bg-white z-40 pl-3">
      <ul
        className="py-1 px-2
       text-lg font-semibold"
      >
        <li>
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer">Shorts</li>
        <li className="cursor-pointer">Live</li>
      </ul>
      <h1 className="py-2 text-lg font-bold cursor-pointer">Subscribtions</h1>
      <ul
        className="py-1 px-2
       text-lg font-semibold"
      >
        <li className="cursor-pointer">Sports</li>
        <li className="cursor-pointer">Movies</li>
        <li className="cursor-pointer">Games</li>
      </ul>
      <h1 className="py-2 text-lg font-bold cursor-pointer">Watch Later</h1>
      <ul
        className="py-1 px-2
       text-lg font-semibold"
      >
        <li className="cursor-pointer">News</li>
        <li className="cursor-pointer"> Movies</li>
      </ul>
    </div>
  );
};

export default SideBar;
