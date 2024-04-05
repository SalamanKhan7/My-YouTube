import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { MdOutlineFileDownload } from "react-icons/md";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import {
  YOUTUBE_VIDEO_API_ADDED,
  YOUTUBE_VIDEO_API_ADDEDNEW,
} from "../utils/contants";

import SidebarCard from "./SidebarCard";
const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { title, channelTitle, description } = location.state;
  const [newvideos, setNewvideos] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        let newData = await fetch(YOUTUBE_VIDEO_API_ADDEDNEW);

        let res = await newData.json();

        setNewvideos((prev) => [...prev, ...res?.items]);
      }
    } catch (error) {
      throw Error(error);
    }
  };
  const getData = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API_ADDED);
    const json = await data.json();

    setNewvideos(json.items);
  };

  return (
    <div className="flex flex-col mt-32  ">
      <div className="px-5 flex ">
        <div>
          <iframe
            className="rounded-lg"
            width="900"
            height="450"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full  ">
          <LiveChat />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="py-1 px-5 mt-2 w-[900px]">
          <h1 className="font-bold text-xl">{title}</h1>
          <div className="flex  py-1 items-center justify-between">
            <div className="flex mt-2 py-1 items-center">
              <img
                alt="user"
                className=" h-7"
                src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
              />
              <h2 className="font-medium text-lg px-2">{channelTitle}</h2>
              <button className="px-4 py-1 ml-1 bg-black rounded-full text-white">
                join
              </button>
              <button className="px-4 py-1 ml-1 bg-gray-300 rounded-full text-black font-medium">
                Subscribe
              </button>
            </div>
            <div className="flex mt-2 py-1 items-center">
              <button className="px-4 py-1 ml-1 bg-gray-300 rounded-full text-black font-medium text-2xl">
                <AiOutlineLike />
              </button>
              <button className="px-4 py-1 ml-1 bg-gray-300 rounded-full text-black font-medium text-2xl">
                <AiOutlineDislike />
              </button>
              <button className="px-4 py-1 ml-1 bg-gray-300 rounded-full text-black font-medium text-xl flex items-center">
                <MdOutlineFileDownload className="text-2xl pr-1" /> Download
              </button>
            </div>
          </div>
          <div className="px-5  py-1  bg-gray-200 rounded-lg text-black font-medium w-[900px]">
            <h2>{description}</h2>
          </div>
          <div className="w-[900px]">
            <CommentsContainer />
          </div>
        </div>

        <div className=" flex flex-col ">
          {newvideos.map((video, index) => (
            <Link
              to={"/watch?v=" + video.id}
              key={video.id + index}
              state={{
                title: video.snippet.title,
                channelTitle: video.snippet.channelTitle,
                description: video.snippet.description,
              }}
            >
              <SidebarCard info={video} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
