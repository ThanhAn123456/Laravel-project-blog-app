import defaultAvatar from "../../assets/images/default_avatar.jpg";
interface UserItemProps {
  avatarUrl: string;
  username: string;
  // isFollowing: boolean;
  type: "followers" | "following";
  onToggleFollow: () => void;
}

const UserItem: React.FC<UserItemProps> = ({
  avatarUrl,
  username,
  type,
  // isFollowing,
  onToggleFollow,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white  hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl || defaultAvatar}
          alt={username}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
        />
        <div className="flex flex-col justify-center items-center gap-0.5">
          <span className="text-[14px] font-semibold font-sans text-black">
            {username}
          </span>
          {/* <span className="text-[14px]  font-normal font-sans text-gray-500">
            {username}
          </span> */}
        </div>
      </div>
      <button
        onClick={onToggleFollow}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
          // isFollowing
          // ?
          "bg-[rgba(239,239,239)] text-black hover:bg-[rgba(0,0,0,0.1)]"
          // : "bg-[#0095f6] text-white hover:bg-blue-600"
        }`}
      >
        {type === "followers" ? "Xoá" : "Đang theo dõi"}
      </button>
    </div>
  );
};

export default UserItem;
