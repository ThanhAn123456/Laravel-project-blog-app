import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLazyHandleGitHubCallbackQuery } from "store/api/endpoints/OAuth2";
import { saveUserInfo } from "store/slice/auth";

const GitHubCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [handleGitHubCallback] = useLazyHandleGitHubCallbackQuery();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state) {
      handleGitHubCallback({ code, state })
        .unwrap()
        .then((response) => {
          if (response.status === 200) {
            dispatch(
              saveUserInfo({
                access_token: response.data.token,
              })
            );
            toast.success("Authenticated successfully!");
            navigate("/");
          } else {
            toast.error(response.message || "Authentication failed.");
          }
        })
        .catch((error) => {
          console.error("GitHub Callback Error:", error);
          toast.error("Authentication failed. Please try again.");
        });
    } else {
      toast.error("Invalid GitHub callback.");
      navigate("/auth/sign-in");
    }
  }, [dispatch, handleGitHubCallback, navigate]);

  return <p>Processing GitHub authentication...</p>;
};

export default GitHubCallback;
