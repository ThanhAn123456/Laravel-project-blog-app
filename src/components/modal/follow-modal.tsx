import { IconSearch, IconX } from "@tabler/icons-react";
import UserItem from "components/user/user-item";
import { useState } from "react";
import { useIsFollowingQuery } from "../../store/api/endpoints/follow";

interface User {
  avatar: string;
  name: string;
  user_id: number;
  email: string;
  role_id: number;
}

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  list: User[];
  type: "followers" | "following";
  currentUserId: number;
  // followingIds: number[];
  // onToggleFollow: (userId: number, isFollowing: boolean) => void;
}

const FollowModal: React.FC<FollowModalProps> = ({
  isOpen,
  onClose,
  list,
  type,
  currentUserId,

  // followingIds,
  // onToggleFollow,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Lọc danh sách người dùng theo từ khóa tìm kiếm
  const filteredList = list.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-sm w-full relative h-[420px]">
        <div className="flex items-center flex-grow justify-center mb-4 pt-4">
          <h2 className="text-base text-center font-bold">
            {type === "followers" ? "Người theo dõi" : "Đang theo dõi"}
          </h2>
          <button
            onClick={onClose}
            className="absolute right-4 text-gray-600 text-xl p-1"
          >
            <IconX stroke={2} size={24} />
          </button>
        </div>

        {/* Ô tìm kiếm */}
        <div className="flex items-center rounded-lg mx-4 mb-4 bg-[#EFEFEF]">
          {!searchQuery && !isFocused && (
            <div className="pl-2">
              <IconSearch
                stroke={1.5}
                size={20}
                className="text-gray-400 mr-1"
              />
            </div>
          )}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Tìm kiếm..."
            className="w-full p-2 text-sm text-gray-700 bg-[#EFEFEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent"
          />
        </div>

        {/* Danh sách người dùng */}
        {filteredList && filteredList.length > 0 && (
          <div className="overflow-y-auto max-h-96">
            <ul>
              {type === "following"
                ? filteredList.map((user) => {
                    if (user.user_id === currentUserId) return null;
                    return (
                      <li key={user.user_id}>
                        <UserItem
                          user={user}
                          type={type}
                          userId={user.user_id}
                        />
                      </li>
                    );
                  })
                : filteredList.map((user) => {
                    if (user.user_id === currentUserId) return null;
                    return (
                      <li key={user.user_id}>
                        <UserItem
                          user={user}
                          type={type}
                          userId={user.user_id}
                        />
                      </li>
                    );
                  })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowModal;
