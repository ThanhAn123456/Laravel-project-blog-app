import React from "react";
import { useGetAllPostQuery } from "store/api/endpoints/post";
import PostCard from "./components/PostCard";
import { PostCardType } from "types/PostCard.type";

const Home: React.FC = () => {
  const { data, isLoading } = useGetAllPostQuery(1);

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto">
        {data?.data.posts.map((post: PostCardType) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
