import {
  IconBrandLine,
  IconHeart,
  IconHeartDiscount,
  IconShare,
} from "@tabler/icons-react";
import React, { useState } from "react";

interface PostProps {
  username: string;
  avatarUrl: string;
  postImageUrl: string;
  caption: string;
  likes: number;
  comments: { username: string; text: string }[];
}

const PostCard: React.FC<PostProps> = ({
  username,
  avatarUrl,
  postImageUrl,
  caption,
  likes,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm mb-4 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <span className="font-semibold text-sm">{username}</span>
      </div>

      {/* Post Image */}
      <div>
        <img
          src={postImageUrl}
          alt="post"
          className="w-full object-cover max-h-[500px]"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button onClick={toggleLike} className="focus:outline-none">
            <IconHeart
              className={`w-6 h-6 ${
                isLiked ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
            />
          </button>
          <IconBrandLine className="w-6 h-6 text-gray-500 cursor-pointer" />
          <IconShare className="w-6 h-6 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Likes Count */}
      <div className="px-4 text-sm font-semibold">{likeCount} likes</div>

      {/* Caption */}
      <div className="px-4 py-2 text-sm">
        <span className="font-semibold">{username} </span>
        {caption}
      </div>

      {/* Comments */}
      <div className="px-4 py-2">
        {comments.slice(0, 2).map((comment, index) => (
          <div key={index} className="text-sm mb-1">
            <span className="font-semibold">{comment.username} </span>
            {comment.text}
          </div>
        ))}
        {comments.length > 2 && (
          <div className="text-gray-500 text-sm cursor-pointer">
            View all {comments.length} comments
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
