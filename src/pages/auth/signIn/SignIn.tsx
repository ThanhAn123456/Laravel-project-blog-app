import { IconBrandGoogleFilled } from "@tabler/icons-react";

const SignIn = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-screen">
      <div className="bg-white w-[30%] h-auto p-10 gap-3 flex flex-col  items-center rounded-lg drop-shadow-xl">
        <h1 className="font-bold text-4xl mb-3">Welcome Back!</h1>
        <div className="w-full h-12 flex justify-between items-center gap-3">
          <button className="bg-[#316BFF] hover:bg-blue-700 w-full h-full flex justify-center items-center gap-2 text-white font-bold py-1 px-4 rounded-lg">
            <IconBrandGoogleFilled></IconBrandGoogleFilled>
            <p>Sign in with Google</p>
          </button>
          <button className="bg-[#323439] hover:bg-[#18191c] w-[60px] h-full text-3xl text-white font-bold py-1 px-4 rounded-lg">
            f
          </button>
        </div>
        <p className="text-[#84878B]">------ or continue with ------</p>
        <form className="w-full h-auto">
          <div className="mb-3">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <a
            href="#"
            className="block text-blue-600 hover:underline mb-3 text-right"
          >
            Forgot your password?
          </a>
          <button className="bg-[#316BFF] hover:bg-blue-700 w-full text-white font-bold py-3 px-4 border rounded-lg">
            Sign in
          </button>
        </form>
        <div className="flex gap-1">
          <p>Don’t have an account? </p>
          <a href="" className="block text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
