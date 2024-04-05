import React from "react";
import Button from "./Button";

const ButtonsList = () => {
  const list = [
    "All",
    "Musics",
    "Computer Science",
    "JavaScript",
    "News",
    "Movies",
    "Games",
    "Songs",
    "React",
    "Redux",
    "HTML",
  ];

  //scrolling of button can be add
  return (
    <div className="flex flex-wrap  min-w-full justify-center px-1  ">
      {list.map((btn) => (
        <Button name={btn} key={btn} />
      ))}
      {/* <Button name="All" />
      <Button name="News" />
      <Button name="Games" /> */}
    </div>
  );
};

export default ButtonsList;
