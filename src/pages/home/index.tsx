import { PostCard } from "components";
import React from "react";
import { Navigate } from "react-router";
import { useGetAllPostQuery } from "store/api/endpoints/post";

const Home: React.FC = () => {
  const dummyPosts = [
    {
      username: "johndoe",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      postImageUrl: "https://via.placeholder.com/600",
      caption: "Exploring the beauty of nature! 🌿🌞",
      likes: 123,
      comments: [
        { username: "janedoe", text: "Wow, amazing view!" },
        { username: "travel_guru", text: "Where is this place?" },
      ],
    },
    {
      username: "janedoe",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      postImageUrl: "https://via.placeholder.com/600",
      caption: "Had a great time with friends! 🥂",
      likes: 87,
      comments: [
        { username: "johndoe", text: "Looks so fun!" },
        { username: "partylover", text: "Cheers! 🍻" },
      ],
    },
  ];

  const { data, isLoading } = useGetAllPostQuery({});

  console.log("data: ", data);

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto">
        {dummyPosts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
