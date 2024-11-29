import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "router";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
};

export default App;
