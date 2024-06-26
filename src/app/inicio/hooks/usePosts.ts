import { useContext } from "react";
import { PostsContext } from "../context/PostContex";

export const usePostsContext = () => {
  const { postsState, setPost, setPosts, deletePost } =
    useContext(PostsContext);

  return {
    postsState,
    setPost,
    setPosts,
    deletePost,
  };
};
