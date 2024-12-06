import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "store/api/endpoints/auth"; // Thay thế bằng endpoint reset password thực tế
import { ResetPasswordType } from "types/auth.type";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Lấy token và email từ URL
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [formData, setFormData] = useState<ResetPasswordType>({
    email: "",
    token: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !token) {
      toast.error("Do not have email or token.");
      return;
    }
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      formData.email = email;
      formData.token = token;
      const response = await resetPassword(formData).unwrap();

      if (response?.status === 200) {
        toast.success("Password reset successfully. Redirecting to login...");
        navigate("/auth/sign-in");
      } else {
        toast.error(response?.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Reset Password Error:", error);
      toast.error("An error occurred while resetting the password.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="bg-white w-[30%] h-auto p-10 gap-3 flex flex-col items-center rounded-lg drop-shadow-xl">
        <h1 className="font-bold text-4xl mb-3">Reset Password</h1>
        <form className="w-full h-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password_confirmation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm new password"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#316BFF] hover:bg-blue-700 w-full text-white font-bold py-3 px-4 border rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Resetting password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
