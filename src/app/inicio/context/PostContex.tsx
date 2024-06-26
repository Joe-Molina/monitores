'use client'

import { createContext } from "react";
import { Post, PostState } from "../interfaces/interfaces";

export type PostContextProps = {
    postsState: PostState,
    setPost: (post: Post) => void,
    setPosts: () => void,
    deletePost: (id: number) => void,

  };

  export const PostsContext = createContext<PostContextProps>({} as PostContextProps)