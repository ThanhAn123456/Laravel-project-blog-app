import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";
import { useGetUserByIdQuery } from "store/api/endpoints/user";
import { CommentCardType } from "types/comment.type";
import defaultAvatar from "../../../assets/images/default_avatar.jpg";

const CommentCard: React.FC<CommentCardType> = ({
  user_id,
  content,
  created_at,
}) => {
  const { data: userData } = useGetUserByIdQuery(user_id);

  // Chuyển đổi chuỗi ISO thành đối tượng Date và tính khoảng cách thời gian
  const timeAgo = formatDistanceToNow(parseISO(created_at), {
    addSuffix: true,
  });

  return (
    <div className="flex items-start mb-3">
      <img
        src={userData?.data.avatar || defaultAvatar}
        alt="commenter-avatar"
        className="w-8 h-8 rounded-full object-cover mr-3"
      />
      <div>
        <span className="font-semibold text-base">{userData?.data.name}</span>
        <p className="text-sm">{content}</p>
        <span className="text-xs text-[#65686c] font-semibold">{timeAgo}</span>
      </div>
    </div>
  );
};

export default CommentCard;
