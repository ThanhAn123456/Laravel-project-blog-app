import defaultAvatar from "../../assets/images/default_avatar.jpg";
import {
  useIsFollowingQuery,
  useFollowMutation,
  useUnfollowMutation,
} from "../../store/api/endpoints/follow";

interface User {
  user_id: number;
  avatar: string;
  name: string;
}

interface UserItemProps {
  user: User;
  userId: number;
  type: "followers" | "following";
}

const UserItem: React.FC<UserItemProps> = ({ user, type, userId }) => {
  const { data: isFollowing, isLoading } = useIsFollowingQuery(user.user_id);
  // console.log("isFollowing userid: " + user.user_id, isFollowing);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const handleFollowClick = async () => {
    try {
      if (isFollowing?.data.isFollowing) {
        await unfollow(user.user_id);
      } else {
        await follow(user.user_id);
      }
    } catch (error) {
      console.error("Failed to update follow status:", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar || defaultAvatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex flex-col justify-center items-center gap-0.5">
          <span className="text-[14px] font-semibold font-sans text-black">
            {user.name}
          </span>
        </div>
      </div>

      <button
        onClick={handleFollowClick}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
          isFollowing?.data.isFollowing
            ? "bg-[rgba(239,239,239)] text-black hover:bg-[rgba(0,0,0,0.1)]"
            : "bg-[#0095f6] text-white hover:bg-blue-600"
        }`}
        disabled={isLoading}
      >
        {isFollowing?.data.isFollowing ? "Đang theo dõi" : "Theo dõi"}
      </button>
    </div>
  );
};

export default UserItem;
