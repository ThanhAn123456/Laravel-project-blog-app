import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignInMutation } from "store/api/endpoints/auth";
import {
  useLazySignInByGitHubQuery,
  useLazySignInByGoogleQuery,
  useSignInByGitHubQuery,
  useSignInByGoogleQuery,
} from "store/api/endpoints/OAuth2";
import { saveUserInfo } from "store/slice/auth";
import { SignInType } from "types/auth.type";

const SignIn = () => {
  const [signIn, { data, isLoading, isSuccess }] = useSignInMutation();
  const [signInByGoogle] = useLazySignInByGoogleQuery({});
  const [signInByGitHub] = useLazySignInByGitHubQuery({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInType>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signIn(formData);
    } catch (error: any) {
      alert("Login failed. Please check your credentials.");
      console.error("Sign In Error:", error);
    }
  };

  const handleGitHubClick = async () => {
    try {
      const response = await signInByGitHub({}).unwrap();
      console.log("response", response);
      if (response.status === 200) {
        window.location.href = response.data.redirect_url; // Redirect đến GitHub
      } else {
        toast.error("Failed to generate GitHub redirect URL.");
      }
    } catch (error: any) {
      alert("Login failed. Please check your credentials.");
      console.error("Sign In Error:", error);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const response = await signInByGoogle({}).unwrap();
      console.log("response", response);
      if (response.status === 200) {
        window.location.href = response.data.redirect_url; // Redirect đến GitHub
      } else {
        toast.error("Failed to generate GitHub redirect URL.");
      }
    } catch (error: any) {
      alert("Login failed. Please check your credentials.");
      console.error("Sign In Error:", error);
    }
  };

  useEffect(() => {
    if (!data) return; // Bỏ qua nếu không có dữ liệu

    console.log("data: ", data);

    // Lưu thông tin người dùng nếu thành công
    if (isSuccess && data.status === 200) {
      dispatch(
        saveUserInfo({
          access_token: data?.data?.access_token,
        })
      );
      navigate("/");
    }

    // Hiển thị thông báo toast
    toast(data?.message, {
      autoClose: 2000,
      type: isSuccess ? (data.status === 200 ? "success" : "warning") : "error",
    });
  }, [data, dispatch, navigate, isSuccess]);

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="bg-white w-[30%] h-auto p-10 gap-3 flex flex-col  items-center rounded-lg drop-shadow-xl">
        <h1 className="font-bold text-4xl mb-3">Welcome Back!</h1>
        <div className="w-full h-12 flex justify-between items-center gap-3">
          <button
            onClick={handleGoogleClick}
            className="bg-[#316BFF] hover:bg-blue-700 w-full h-full flex justify-center items-center gap-2 text-white font-bold py-1 px-4 rounded-lg"
          >
            <IconBrandGoogleFilled></IconBrandGoogleFilled>
            <p>Sign in with Google</p>
          </button>
          <button
            onClick={handleGitHubClick}
            className="bg-[#323439] hover:bg-[#18191c] w-[60px] h-full text-3xl text-white font-bold py-1 px-4 rounded-lg"
          >
            <IconBrandGithubFilled></IconBrandGithubFilled>
          </button>
        </div>
        <p className="text-[#84878B]">------ or continue with ------</p>
        <form className="w-full h-auto" onSubmit={handleSubmit}>
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
          <Link
            to="/auth/forgot-password"
            className="block text-blue-600 hover:underline mb-3 text-right"
          >
            Forgot your password?
          </Link>
          <button
            type="submit"
            className="bg-[#316BFF] hover:bg-blue-700 w-full text-white font-bold py-3 px-4 border rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="flex gap-1">
          <p>Don’t have an account? </p>
          <Link
            to="/auth/sign-up"
            className="block text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
