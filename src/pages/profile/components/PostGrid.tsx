import React from "react";
import { useGetMediaByPostIdQuery } from "../../../store/api/endpoints/media";

type PostWithImage = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  status: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  image: string;
};

type PostGridProps = {
  postId: number;
};

type Media = {
  id: number;
  post_id: number;
  file_url: string;
  type: string;
  created_at: string;
  updated_at: string;
};

const PostGrid: React.FC<PostGridProps> = ({ postId }) => {
  const { data: mediaList = { data: [] }, isLoading } =
    useGetMediaByPostIdQuery([postId]);

  const image =
    mediaList.data?.find((media: Media) => media.post_id === postId)
      ?.file_url || "";

  if (isLoading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-min-[300px] h-[300px]">
      <img
        src={image || "https://via.placeholder.com/300"}
        alt={`Image for post ${postId}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PostGrid;
