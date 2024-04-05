import React from "react";

const Button = ({ name }) => {
  return (
    <button className="px-3 py-1 m-2 bg-slate-300 rounded-lg ">{name}</button>
  );
};

export default Button;
