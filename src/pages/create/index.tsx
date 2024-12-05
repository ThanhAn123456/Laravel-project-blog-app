import React, { useState } from "react";
import { useCreatePostMutation } from "store/api/endpoints/post";
import { useCreateMediaMutation } from "store/api/endpoints/media";
import { CreatePostType } from "types/post.type";
import { toast } from "react-toastify";

const Create: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<boolean>(true);
  const [images, setImages] = useState<File[]>([]);

  const [createPost] = useCreatePostMutation();
  const [createMedia] = useCreateMediaMutation();

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Tạo bài viết
    const postBody: CreatePostType = { title, content, status };
    const postResponse = await createPost(postBody);

    toast(postResponse?.data.message, {
      autoClose: 2000,
      type: postResponse?.data.status === 201 ? "success" : "error",
    });

    if (postResponse.data.data) {
      const postId = postResponse.data.data.id;

      // Tạo media (tải ảnh lên)
      const formData = new FormData();
      formData.append("post_id", postId.toString());
      formData.append("type", "1");
      images.forEach((image) => formData.append("file_urls[]", image));

      const mediaResponse = await createMedia(formData); // Tải ảnh lên
      console.log("mediaResponse", mediaResponse);
      toast(mediaResponse?.data.message, {
        autoClose: 2000,
        type: mediaResponse?.data.status === 201 ? "success" : "error",
      });
    } else {
      alert("Có lỗi xảy ra khi tạo bài viết.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
      <form onSubmit={handlePostSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter title..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Content..."
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Status
          </label>
          <div className="flex gap-2 items-center h-5">
            <input
              type="checkbox"
              checked={status}
              onChange={() => setStatus(!status)}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
            <span>{status ? "Public" : "Private"}</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Choose file
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-[#316BFF] hover:bg-blue-700 w-full text-white font-bold py-3 px-4 border rounded-lg"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
