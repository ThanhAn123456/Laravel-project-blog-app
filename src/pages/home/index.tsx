import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLazyGetAllPostQuery } from "store/api/endpoints/post";
import PostCard from "./components/PostCard";
import { PostCardType } from "types/PostCard.type";
import SkeletonPost from "./components/SkeletonPost";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostCardType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadedIds = useRef(new Set<number>()); // Lưu ID của bài viết đã tải

  const [getAllPost, { isLoading }] = useLazyGetAllPostQuery();

  // Tải bài viết từ API
  const loadPosts = useCallback(
    async (pageToLoad: number) => {
      if (isLoading || !hasMore) return;

      try {
        const response = await getAllPost(pageToLoad).unwrap();
        console.log("response", response);

        if (response?.data?.posts.length) {
          const uniquePosts = response.data.posts.filter(
            (post: PostCardType) => {
              const isDuplicate = loadedIds.current.has(post.id); // Kiểm tra trùng lặp
              if (!isDuplicate) loadedIds.current.add(post.id); // Thêm vào danh sách đã tải
              return !isDuplicate;
            }
          );

          setPosts((prevPosts) => [...prevPosts, ...uniquePosts]);
          setHasMore(pageToLoad < response.data.pagination.last_page);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
      }
    },
    [isLoading, hasMore, getAllPost]
  );

  // Gọi API khi component render lần đầu
  useEffect(() => {
    loadPosts(1); // Tải trang đầu tiên
  }, [loadPosts]);

  // Gọi API khi `page` thay đổi
  useEffect(() => {
    if (page > 1) {
      loadPosts(page);
    }
  }, [page, loadPosts]);

  // Hàm xử lý khi nhấn nút "See More Posts"
  const loadMorePosts = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto">
        {/* Hiển thị bài viết */}
        {posts.map((post: PostCardType) => (
          <PostCard key={post.id} {...post} />
        ))}

        {/* Hiển thị skeleton khi đang tải */}
        {isLoading && (
          <div className="flex flex-col items-center">
            <SkeletonPost />
            <SkeletonPost />
          </div>
        )}

        {/* Nút "Xem thêm bài viết" */}
        {hasMore && !isLoading && (
          <button
            className="block mx-auto my-6 px-4 py-2 text-blue-500 hover:underline"
            onClick={loadMorePosts}
          >
            See More Posts
          </button>
        )}

        {/* Thông báo nếu không còn bài viết */}
        {!hasMore && posts.length > 0 && (
          <div className="text-center py-4 text-gray-500">
            No more posts to load
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
