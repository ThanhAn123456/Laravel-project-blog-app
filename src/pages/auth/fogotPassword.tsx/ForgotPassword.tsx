import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "store/api/endpoints/auth";
import { ForgotPasswordType } from "types/auth.type";

const ForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordType>({ email: "" });
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await forgotPassword(formData).unwrap();
      console.log("response", response);
      toast.success(response?.message || "Password reset email sent!");
      //   navigate("/auth/sign-in");
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to send reset email. Please try again."
      );
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="bg-white w-[30%] h-auto p-10 gap-3 flex flex-col items-center rounded-lg drop-shadow-xl">
        <h1 className="font-bold text-4xl mb-3">Forgot Password</h1>
        <p className="text-center text-[#84878B] mb-5">
          Enter your email to receive a password reset link.
        </p>
        <form className="w-full h-auto" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#316BFF] hover:bg-blue-700 w-full text-white font-bold py-3 px-4 rounded-lg"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <button
          className="mt-4 text-blue-600 hover:underline"
          onClick={() => navigate("/auth/sign-in")}
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
