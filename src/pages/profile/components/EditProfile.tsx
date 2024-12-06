import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../../../store/api/endpoints/user";
import defaultAvatar from "../../../assets/images/default_avatar.jpg";

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation(); // Sử dụng custom hook của bạn

  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(defaultAvatar);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", username);
    if (fileInputRef.current?.files?.[0]) {
      formData.append("avatar", fileInputRef.current.files[0]);
    }
    formData.forEach((value, key) => {
      console.log(key, value); // In từng cặp khóa và giá trị
    });
    try {
      // Gửi PUT request tới API
      const response = await updateUser(formData).unwrap(); // .unwrap() để xử lý kết quả trả về
      console.log("Respone", response);
      if (response.status === 200) {
        navigate("/profile"); // Điều hướng tới trang profile khi cập nhật thành công
      } else {
        console.error("Cập nhật thất bại:", response.message);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  // Xử lý thay đổi ảnh
  const handleAvatarChange = () => {
    if (fileInputRef.current?.files?.[0]) {
      setAvatar(URL.createObjectURL(fileInputRef.current.files[0]));
    }
  };

  return (
    <div className="max-w-[600px] w-full mx-auto px-5 py-8">
      <h1 className="text-xl font-bold mb-4">Chỉnh sửa hồ sơ</h1>
      <form onSubmit={handleUpdateProfile} className="space-y-6">
        {/* Ảnh đại diện */}
        <div className="flex items-center space-x-4">
          <img
            src={avatar || defaultAvatar}
            alt="Avatar Preview"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Thay đổi ảnh
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Tên người dùng */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Tên người dùng
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nhập tên mới"
          />
        </div>

        {/* Nút lưu */}
        <button
          type="submit"
          className="px-4 py-2 w-full text-white bg-green-500 rounded hover:bg-green-600"
        >
          Lưu thay đổi
        </button>

        {/* Nút hủy */}
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="px-4 py-2 w-full text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
        >
          Hủy
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
