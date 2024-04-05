import React, { useEffect } from "react";
import { YOUTUBE_VIDEO_API, YOUTUBE_VIDEO_API_ADD } from "../utils/contants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addVideo } from "../utils/videoSlice";
import { filterVideo } from "../utils/filterSlice";

const VideoContainer = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);
  const videos = useSelector((store) => store.video.videos);
  const filterVideos = useSelector((store) => store.filter.filterVideos);
  console.log(videos);
  console.log(filterVideos);
  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        let newData = await fetch(YOUTUBE_VIDEO_API_ADD);

        let res = await newData.json();
        dispatch(filterVideo(res?.items));
        dispatch(addVideo(res?.items));

        // setVideos((prev) => [...prev, ...res?.items]);
      }
    } catch (error) {
      throw Error(error);
    }
  };

  const getData = async () => {
    const data = await fetch(YOUTUBE_VIDEO_API);
    const json = await data.json();

    dispatch(filterVideo(json?.items));
    dispatch(addVideo(json?.items));
  };

  return isMenuOpen ? (
    <div className="flex flex-wrap mt-16 w-full ml-[162px] ">
      {filterVideos.map((video, index) => (
        <Link
          to={"/watch?v=" + video.id}
          key={video.id + index}
          state={{
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            description: video.snippet.description,
          }}
        >
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  ) : (
    <div className={"flex flex-wrap mt-16 ml-20  "}>
      {filterVideos.map((video, index) => (
        <Link
          to={"/watch?v=" + video.id}
          key={video.id + index}
          state={{
            title: video.snippet.title,
            channelTitle: video.snippet.channelTitle,
            description: video.snippet.description,
          }}
        >
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
