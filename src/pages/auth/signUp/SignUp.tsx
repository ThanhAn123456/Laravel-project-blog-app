import { useSignUpMutation } from "store/api/endpoints/auth";
import { SignUpType } from "types/auth.type";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp, { data, isLoading, error, isSuccess }] = useSignUpMutation();
  const [formData, setFormData] = useState<SignUpType>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast("Passwords do not match", {
        autoClose: 2000,
        type: "warning",
      });
      return;
    }

    try {
      await signUp(formData);
    } catch (error) {
      alert("Sign In Error.");
      console.error("Sign In Error:", error);
    }
  };

  useEffect(() => {
    if (!data) return; // Bỏ qua nếu không có dữ liệu

    // Lưu thông tin người dùng nếu thành công
    if (isSuccess && data.status === 201) {
      navigate("/auth/sign-in");
    }

    // Hiển thị thông báo toast
    toast(data?.message, {
      autoClose: 2000,
      type: isSuccess
        ? data.status === "201"
          ? "success"
          : "warning"
        : "error",
    });
  }, [data, dispatch, navigate, isSuccess]);

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="bg-white w-[30%] h-auto p-10 gap-3 flex flex-col  items-center rounded-lg drop-shadow-xl">
        <h1 className="font-bold text-4xl mb-3">Sign Up</h1>
        <form className="w-full h-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password_confirmation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="password_confirmation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Confirm your password"
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
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{(error as any).message}</p>}
        <div className="flex gap-1">
          <p>Already have an account? </p>
          <Link
            to="/auth/sign-in"
            className="block text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
