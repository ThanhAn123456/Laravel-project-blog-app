import React from "react";
import { useGetUserByIdQuery } from "store/api/endpoints/user";
import { CommentCardType } from "types/comment.type";

const CommentCard: React.FC<CommentCardType> = ({ user_id, content }) => {
  const { data: userData } = useGetUserByIdQuery(user_id);

  return (
    <div className="flex items-start mb-3">
      <img
        src={userData?.data.avatar}
        alt="commenter-avatar"
        className="w-8 h-8 rounded-full object-cover mr-3"
      />
      <div>
        <span className="font-semibold">{userData?.data.name}</span>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
