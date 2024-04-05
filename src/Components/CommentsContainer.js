import React from "react";

const commentsData = [
  {
    name: "Salaman Khan",
    text: "Lorem ipsum dolor sit amet, consecutur adip",
    replies: [],
  },
  {
    name: "Ashutosh Singh",
    text: "Lorem ipsum dolor sit amet, consecutur adip",
    replies: [
      {
        name: "Salaman Khan",
        text: "Lorem ipsum dolor sit amet, consecutur adip",
        replies: [],
      },
      {
        name: "Ashutosh Singh",
        text: "Lorem ipsum dolor sit amet, consecutur adip",
        replies: [
          {
            name: "Salaman Khan",
            text: "Lorem ipsum dolor sit amet, consecutur adip",
            replies: [],
          },
          {
            name: "Ashutosh Singh",
            text: "Lorem ipsum dolor sit amet, consecutur adip",
            replies: [
              {
                name: "Salaman Khan",
                text: "Lorem ipsum dolor sit amet, consecutur adip",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Ikrar",
    text: "Lorem ipsum dolor sit amet, consecutur adip",
    replies: [
      {
        name: "Ashutosh Singh",
        text: "Lorem ipsum dolor sit amet, consecutur adip",
        replies: [],
      },
      {
        name: "Ashutosh Singh",
        text: "Lorem ipsum dolor sit amet, consecutur adip",
        replies: [],
      },
    ],
  },
  {
    name: "Ashutosh Singh",
    text: "Lorem ipsum dolor sit amet, consecutur adip",
    replies: [],
  },
  {
    name: "Anisha",
    text: "Lorem ipsum dolor sit amet, consecutur adip",
    replies: [
      {
        name: "Ashutosh Singh",
        text: "Lorem ipsum dolor sit amet, consecutur adip",
        replies: [],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex shadow-lg bg-gray-100 rounded-lg p-2">
      <img
        className="w-12 h-12"
        alt="comment"
        src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png"
      />
      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

const CommentLists = ({ comments }) => {
  return comments.map((comment, index) => (
    <div key={index}>
      <Comment data={comment} />
      <div className=" border ml-5">
        <CommentLists comments={comment.replies} />
      </div>
    </div>
  ));
};

const CommentsContainer = () => {
  return (
    <div className="">
      <h1 className="font-bold text-2xl">Comments:</h1>
      <CommentLists comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
