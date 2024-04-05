import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";

import ButtonsList from "./ButtonsList";

import { filterVideo } from "../utils/filterSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const videos = useSelector((store) => store.video.videos);

  const searchCache = useSelector((store) => store.search);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSuggestion();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const getSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
  };
  return (
    <div className="shadow-lg pb-2 fixed top-0 w-full bg-white">
      <div className="grid grid-flow-col items-center ">
        <div className="flex items-center col-span-1 pl-3 ">
          <img
            alt="hamburger"
            onClick={toggleMenuHandler}
            className="h-8 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/2048px-Hamburger_icon.svg.png"
          />
          <a href="/">
            <img
              alt="youtube-logo"
              className="h-14 cursor-pointer"
              src="https://t3.ftcdn.net/jpg/03/00/38/90/360_F_300389025_b5hgHpjDprTySl8loTqJRMipySb1rO0I.jpg"
            />
          </a>
        </div>
        <div>
          <div className="col-span-10  flex items-center justify-start  ">
            <input
              type="text"
              className="text-xl border border-gray-300 w-[33rem] rounded-l-full px-3 pt-1 pb-1 "
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                const newfilterVideo = videos.filter((res) =>
                  res.snippet.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                );
                dispatch(filterVideo(newfilterVideo));
              }}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setShowSuggestion(false)}
            />
            <button className="text-xl border border-gray-300 rounded-r-full p-2 w-12 hover:bg-gray-300">
              <IoIosSearch className="text-center" />
            </button>
          </div>
          {showSuggestion && (
            <div className="fixed  bg-white w-[33rem] shadow-lg rounded-lg z-50 ">
              <ul>
                {suggestions.map((s) => (
                  <li
                    className="px-3 py-2 shadow-sm flex items-center   hover:bg-gray-100 "
                    key={s}
                  >
                    <div className="px-2">
                      <IoIosSearch />
                    </div>
                    <div> {s}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-span-1 flex justify-end pr-4">
          <img
            alt="User-icon"
            className="h-8 text-center"
            src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
          />
        </div>
      </div>
      <div>
        <ButtonsList />
      </div>
    </div>
  );
};

export default Head;
