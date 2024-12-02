import {
  IconBookmark,
  IconCamera,
  IconCircle,
  IconHeartFilled,
  IconLayoutGrid,
  IconMessageCircleFilled,
} from "@tabler/icons-react";
import { FollowModal } from "components";
import React, { useState } from "react";
import { useGetUserQuery } from "../../store/api/endpoints/user";

interface Post {
  id: number;
  image: string;
  caption: string;
}

const Profile: React.FC = () => {
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [isFollowingOpen, setIsFollowingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "saved">("posts");

  const { data, isLoading, isSuccess } = useGetUserQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isSuccess && data) {
  const { avatarUrl, username, postsCount, followersCount, followingCount } =
    data;
  // }

  const followers = [
    {
      username: "User 1",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      isFollowing: true,
    },
    {
      username: "User 2",
      avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
      isFollowing: false,
    },
    {
      username: "User 3",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
      isFollowing: true,
    },
  ];

  const following = [
    {
      username: "User A",
      avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      isFollowing: true,
    },
    {
      username: "User B",
      avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
      isFollowing: false,
    },
    {
      username: "User C",
      avatarUrl: "https://randomuser.me/api/portraits/men/6.jpg",
      isFollowing: true,
    },
  ];

  const toggleFollowersModal = () => setIsFollowersOpen(!isFollowersOpen);
  const toggleFollowingModal = () => setIsFollowingOpen(!isFollowingOpen);

  const posts: Post[] = [
    {
      id: 1,
      image:
        "https://instagram.fdad1-1.fna.fbcdn.net/v/t39.30808-6/468740485_1219758792843992_5867628167050463389_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMzY1eDEzNjUuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fdad1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=uGNzHu2KNpkQ7kNvgGnQOLg&_nc_gid=0087a1988ba5498493683a781ca3cb47&edm=AP4sbd4AAAAA&ccb=7-5&ig_cache_key=MzUxMjE0MzU3ODA3NDA0NjgyNw%3D%3D.3-ccb7-5&oh=00_AYCqnv2LkoXjPMk0SddmKm9RqJSP2MSlodKvqTqhxAQi2A&oe=67531722&_nc_sid=7a9f4b",
      caption: "Post 1",
    },
    {
      id: 2,
      image:
        "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/468834825_1279460653380352_454001235547791474_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=rmJf8HKCFSUQ7kNvgHA2pqh&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=A2_XArlWjVOPubSUNNmhhAv&oh=00_AYAoCNVQY-JCkUE1T9N-wy_X8tobX168RhNheRfePxRWjg&oe=67534A5F",
      caption: "Post 2",
    },
    {
      id: 3,
      image:
        "https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-6/468725512_539468055649287_4380880226724341098_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=TOCQ6AumjZoQ7kNvgHqqgiK&_nc_zt=23&_nc_ht=scontent.fdad1-4.fna&_nc_gid=ATO2W9ubkwqEEYkzF85aCor&oh=00_AYCEZKqrZPMUwGJ9hdwQrNFDKzcoc2kp0zAjESRJnzKEyA&oe=6753258B",
      caption: "Post 3",
    },
    { id: 4, image: "https://via.placeholder.com/300", caption: "Post 4" },
  ];
  const saved: Post[] = [];

  return (
    <div className="w-[975px] mx-auto px-5 py-8">
      <div className="flex items-start gap-x-8 bg-white mb-8">
        <div className="relative flex flex-col items-center justify-center w-72">
          <div className="absolute -top-5 p-2 bg-white border border-transparent shadow rounded-xl after:content-[''] after:w-3 after:h-3 after:absolute after:top-6 after:bg-white after:border after:rounded-xl after:border-transparent">
            <div className="text-xs font-medium text-[#a1a1aa] ">Ghi chú..</div>
          </div>
          <div className="absolute top-[20px] left-[45%] w-1 h-1 bg-white border border-transparent shadow rounded-xl"></div>
          <img
            src={avatarUrl}
            // src="https://via.placeholder.com/150"
            // alt={username}
            className="w-[150px] h-[150px] rounded-full"
          />
        </div>
        <div className="flex flex-col flex-grow justify-start gap-y-6">
          <div className="flex flex-row items-center">
            <h2 className="text-lg font-sans font-normal mr-4">
              {username}
              thien_antan.dana
            </h2>
            <div className="px-2">
              <a
                href=""
                className="block px-4 py-1 text-sm font-semibold text-[black] bg-[rgba(219,219,219,0.8)] rounded hover:bg-[rgba(219,219,219)]"
              >
                Chỉnh sửa trang cá nhân
              </a>
            </div>
            <a
              href=""
              className="block px-4 py-1 text-sm font-semibold text-[black] bg-[#DBDBDB] rounded opacity-80 hover:opacity-100"
            >
              Xem kho lưu trữ
            </a>
          </div>
          <div className="mt-1 text-black text-base flex gap-x-6">
            <span className="py-1 mr-2">
              <strong>{postsCount} 0 </strong>bài viết
            </span>
            <button
              onClick={toggleFollowersModal}
              className="text-black px-2 py-1 cursor-pointer"
            >
              <strong>{followersCount} 1 </strong>người theo dõi
            </button>
            <button
              onClick={toggleFollowingModal}
              className="text-black px-2 py-1 cursor-pointer"
            >
              Đang theo dõi
              <strong>{followingCount} 4 </strong>người dùng
            </button>
          </div>

          <FollowModal
            isOpen={isFollowersOpen}
            onClose={toggleFollowersModal}
            list={followers}
            type="followers"
          />

          <FollowModal
            isOpen={isFollowingOpen}
            onClose={toggleFollowingModal}
            list={following}
            type="following"
          />
        </div>
      </div>

      <div>
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
                <span className="text-xs uppercase tracking-wide">
                  Bài viết
                </span>
              </span>
            </button>
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === "saved"
                  ? "text-black border-t border-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("saved")}
            >
              <span className="flex items-center gap-2 justify-center ">
                <IconBookmark stroke={2} size={16} />
                <span className="text-xs uppercase tracking-wide">Đã lưu</span>
              </span>
            </button>
          </div>
        </div>

        <div className="bg-white mt-2">
          {activeTab === "posts" ? (
            posts.length > 0 ? (
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post, index) => (
                  <div key={index} className="relative group cursor-pointer">
                    <img
                      key={index}
                      src={post.image}
                      alt={`Post ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-35 transition-all duration-300"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="text-white flex items-center gap-6">
                        <div className="flex items-center gap-1">
                          <IconHeartFilled stroke={1.5} size={24} />
                          <span className="text-lg">120</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <IconMessageCircleFilled
                            className="scale-x-[-1]"
                            stroke={1.5}
                            size={24}
                          />
                          <span className="text-lg">50</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center mt-8 mx-8">
                  <div className="relative w-64 h-32">
                    <IconCircle
                      className="absolute inset-0 m-auto"
                      stroke={0.5}
                      size={84}
                    />
                    <IconCamera
                      className="absolute inset-0 m-auto"
                      stroke={0.9}
                      size={40}
                    />
                  </div>

                  <p className="text-3xl font-extrabold text-black font-sans text-center mt-0">
                    Chưa có bài viết
                  </p>
                </div>
              </div>
            )
          ) : saved.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {saved.map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={`Saved ${index + 1}`}
                  className="w-full h-40 object-cover rounded"
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Không có mục đã lưu nào</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
