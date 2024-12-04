import {
  IconBrandLine,
  IconShare,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import React, { useCallback, useEffect, useState } from "react";
import {
  useCreateCommentMutation,
  useLazyGetCommentByIdQuery,
} from "store/api/endpoints/comment";
import { useGetUserByIdQuery } from "store/api/endpoints/user";
import { CommentType } from "types/comment.type";
import { PostCardType } from "types/PostCard.type";
import CommentCard from "./CommentCard";
import { useGetMediaByPostIdQuery } from "store/api/endpoints/media";
import ImageSlider from "./ImageSlider";
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetIsLikedByPostIdQuery,
  useGetLikeByPostIdQuery,
} from "store/api/endpoints/like";

const PostCard: React.FC<PostCardType> = ({ id, user_id, title, content }) => {
  const pageSize = 8;
  const postId = id;

  const [page, setPage] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isCommentCreated, setIsCommentCreated] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);

  const { data: userData } = useGetUserByIdQuery(user_id);
  const { data: mediaData } = useGetMediaByPostIdQuery(postId);
  const { data: likeData } = useGetLikeByPostIdQuery(postId);
  const { data: isLikedData } = useGetIsLikedByPostIdQuery(postId);
  const [CreateComment] = useCreateCommentMutation();
  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const [fetchComments, { data: commentsData, isLoading: isFetching }] =
    useLazyGetCommentByIdQuery();

  const [formData, setFormData] = useState<CommentType>({
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await CreateComment({ postId, comment: formData });
      setIsCommentCreated(true);
      setFormData({ content: "" });
      for (let i = 1; i <= page; i++) {
        await fetchComments({ postId, page: i, page_size: pageSize });
      }
    } catch (error: any) {
      alert("Login failed. Please check your credentials.");
      console.error("Sign In Error:", error);
    }
  };

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await deleteLike({ postId }).unwrap();
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await createLike({ postId }).unwrap();
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const toggleComments = () => {
    setIsCommentOpen(!isCommentOpen);

    if (!commentsData && !isFetching) {
      fetchComments({ postId, page, page_size: pageSize });
    }
  };

  // Load next page of comments when "See More" is clicked
  const loadMoreComments = useCallback(() => {
    if (
      commentsData &&
      !isFetching &&
      page < commentsData?.data.meta.last_page
    ) {
      setPage((prevPage) => {
        const newPage = prevPage + 1;
        fetchComments({ postId, page: newPage, page_size: pageSize });
        return newPage;
      });
    }
  }, [commentsData, isFetching, page, fetchComments, postId]);

  useEffect(() => {
    if (!isCommentCreated && commentsData && commentsData.data.data) {
      setComments((prevComments) => [
        ...prevComments,
        ...commentsData.data.data,
      ]);
    }
    if (isCommentCreated && commentsData && commentsData.data.data) {
      setComments(() => [...commentsData.data.data]);
      setIsCommentCreated(false);
    }
  }, [commentsData]);

  useEffect(() => {
    if (likeData) {
      setLikeCount(likeData?.data.count); // Khởi tạo likeCount
    }
  }, [likeData]);

  useEffect(() => {
    if (isLikedData) {
      setIsLiked(isLikedData?.data.isLiked);
    }
  }, [isLikedData]);

  return (
    <div className="bg-white border rounded-lg shadow-sm mb-4 max-w-xl mx-auto py-2">
      {/* Header */}
      <div className="flex items-center px-4 py-3">
        <img
          src={userData?.data.avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <span className="font-semibold text-sm">{userData?.data.name}</span>
      </div>

      {/* Title */}
      <div className="px-4 text-lg">{title}</div>

      {/* Content */}
      <div className="px-4 py-2 text-sm">{content}</div>

      {/* Post Image */}
      <ImageSlider mediaData={mediaData?.data || []} />

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-4">
          <button onClick={toggleLike} className="focus:outline-none">
            {!isLiked && <IconThumbUp className={`w-6 h-6 text-gray-500`} />}
            {isLiked && (
              <IconThumbUpFilled className={`w-6 h-6 text-blue-500`} />
            )}
          </button>
          <IconBrandLine
            className="w-6 h-6 text-gray-500 cursor-pointer"
            onClick={toggleComments} // Mở/đóng phần comment
          />
          <IconShare className="w-6 h-6 text-gray-500 cursor-pointer" />
        </div>
      </div>

      {/* Likes Count */}
      <div className="px-4 text-sm font-semibold">{likeCount} likes</div>

      {/* Comments Section */}
      {isCommentOpen && (
        <div className="mt-3 px-4 rounded-lg">
          <div className="overflow-y-auto max-h-[400px]">
            {comments.map((comment: any, index: any) => (
              <CommentCard key={comment.id} {...comment}></CommentCard>
            ))}

            {/* See More Comments Button */}
            {commentsData && page < commentsData?.data.meta.last_page && (
              <button
                onClick={loadMoreComments}
                className="mt-4 text-blue-500 hover:underline"
              >
                See More Comments
              </button>
            )}
          </div>

          <form className="flex items-center mt-2" onSubmit={handleSubmit}>
            <input
              id="content"
              type="text"
              placeholder="Add a comment..."
              className="flex-1 py-1 px-3 border rounded-lg text-sm"
              value={formData.content}
              onChange={handleChange}
              required
            />
            <button className="ml-2 px-2 py-1 font-semibold hover:bg-gray-100 hover:text-blue-700 text-blue-500 rounded ">
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
