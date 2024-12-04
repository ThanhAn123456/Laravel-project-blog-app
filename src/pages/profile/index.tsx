import defaultAvatar from "../../assets/images/default_avatar.jpg";
import { IconLayoutGrid } from "@tabler/icons-react";
import { FollowModal } from "components";
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetFollowersCountQuery,
  useGetFollowingCountQuery,
} from "../../store/api/endpoints/follow";

import {
  useGetUserQuery,
  useGetUserByIdQuery,
} from "../../store/api/endpoints/user";

import {
  useGetPostByUserIdQuery,
  useGetPostCountByUserIdQuery,
} from "../../store/api/endpoints/post";

import PostGrid from "./components/PostGrid";

type Post = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  status: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

const Profile: React.FC = () => {
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts">("posts");

  const { userId: paramUserId } = useParams<{ userId: string }>();
  const { data: currentUser = { data: {} } } = useGetUserQuery({});
  const currentUserId = currentUser.data?.id;

  const userId =
    paramUserId && paramUserId !== String(currentUserId)
      ? paramUserId
      : String(currentUserId);

  const isOwnProfile = userId === String(currentUserId);

  const { data: user = { data: {} }, isLoading: isUserLoading } =
    useGetUserByIdQuery(userId);

  const {
    data: followersCountData = { data: { count: 0 } },
    isLoading: isFollowersCountLoading,
  } = useGetFollowersCountQuery(userId);

  const {
    data: followingCountData = { data: { count: 0 } },
    isLoading: isFollowingCountLoading,
  } = useGetFollowingCountQuery(userId);

  const {
    data: followersList = { data: [] },
    isLoading: isFollowersListLoading,
    isSuccess: isFollowersListSuccess,
  } = useGetFollowersQuery(userId);

  const {
    data: followingList = { data: [] },
    isLoading: isFollowingListLoading,
    isSuccess: isFollowingListSuccess,
  } = useGetFollowingQuery(userId);

  console.log(followingList);

  const {
    data: postCountData = { data: { count: 0 } },
    isLoading: isPostCountLoading,
  } = useGetPostCountByUserIdQuery(userId);

  const { data: postList = { data: [] }, isLoading: isPostListLoading } =
    useGetPostByUserIdQuery(userId);

  const userData = isOwnProfile ? currentUser.data : user.data;

  // Tạo danh sách postId
  const postIdList = useMemo(
    () => postList.data.map((post: Post) => post.id),
    [postList]
  );

  if (
    isFollowersCountLoading ||
    isFollowingCountLoading ||
    isPostCountLoading
  ) {
    return <div>Loading...</div>;
  }

  const toggleFollowersModal = () => setIsFollowersOpen((prev) => !prev);
  const toggleFollowingModal = () => setIsFollowingOpen((prev) => !prev);

  const handleEditProfile = () => {
    // Xử lý chỉnh sửa trang cá nhân
  };

  const handleFollow = () => {
    // Xử lý theo dõi người khác
  };

  return (
    <div className="max-w-[975px] w-full mx-auto px-5 py-8">
      <div className="flex items-start gap-x-8 bg-white mb-8">
        <div className="relative flex flex-col items-center justify-center w-72">
          {isOwnProfile && (
            <>
              <div className="absolute -top-5 p-2 bg-white border border-transparent shadow rounded-xl after:content-[''] after:w-3 after:h-3 after:absolute after:top-6 after:bg-white after:border after:rounded-xl after:border-transparent">
                <div className="text-xs font-medium text-[#a1a1aa] ">
                  Ghi chú..
                </div>
              </div>
              <div className="absolute top-[20px] left-[45%] w-1 h-1 bg-white border border-transparent shadow rounded-xl"></div>
            </>
          )}
          <img
            src={userData?.avatar || defaultAvatar}
            alt={userData?.username || "Avatar"}
            className="w-[150px] h-[150px] rounded-full"
          />
        </div>
        <div className="flex flex-col flex-grow justify-start gap-y-6">
          <div className="flex flex-row items-center">
            <h2 className="text-lg font-serif font-semibold mr-6">
              {userData.name}
            </h2>
            {isOwnProfile ? (
              <>
                <div className="px-2">
                  <a
                    href=""
                    className="block px-4 py-1 text-sm font-semibold text-[black] bg-[rgba(219,219,219,0.8)] rounded hover:bg-[rgba(219,219,219)]"
                  >
                    Chỉnh sửa trang cá nhân
                  </a>
                </div>
                <div>
                  <a
                    href=""
                    className="block px-4 py-1 text-sm font-semibold text-[black] bg-[#DBDBDB] rounded opacity-80 hover:opacity-100"
                  >
                    Xem kho lưu trữ
                  </a>
                </div>
              </>
            ) : (
              <button
                onClick={handleFollow}
                className="px-4 py-1 text-sm font-semibold bg-blue-500 text-white rounded"
              >
                Theo dõi
              </button>
            )}
          </div>
          <div className="mt-1 text-black text-base flex gap-x-6">
            <span className="py-1 mr-2">
              <strong>{postCountData.data.count || 0} </strong>bài viết
            </span>
            <button
              onClick={toggleFollowersModal}
              className="text-black px-2 py-1 cursor-pointer"
            >
              <strong>{followersCountData.data.count} </strong>người theo dõi
            </button>
            <button
              onClick={toggleFollowingModal}
              className="text-black px-2 py-1 cursor-pointer"
            >
              Đang theo dõi
              <strong> {followingCountData.data.count} </strong>người dùng
            </button>
          </div>

          <FollowModal
            isOpen={isFollowersOpen}
            onClose={toggleFollowersModal}
            list={followersList.data}
            type="followers"
          />

          <FollowModal
            isOpen={isFollowingOpen}
            onClose={toggleFollowingModal}
            list={followingList.data}
            type="following"
          />
        </div>
      </div>

      <div className="border-t border-gray-300">
        <div className="flex justify-center space-x-8">
          <button
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "posts"
                ? "text-black border-t border-black"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            <span className="flex items-center gap-2 justify-center ">
              <IconLayoutGrid stroke={1} size={16} />
              <span className="text-xs uppercase tracking-wide">Bài viết</span>
            </span>
          </button>
        </div>
      </div>

      <div className="bg-white mt-2 min-h-[400px]">
        {activeTab === "posts" && postIdList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {postList.data.map((post: { id: number }) => (
              <PostGrid key={post.id} postId={post.id} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[500px]">
            <div className="flex items-center justify-center text-lg text-gray-500">
              Chưa có bài viết nào
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
