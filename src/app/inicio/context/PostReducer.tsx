'use client'

import { Post, PostState } from "../interfaces/interfaces";
import { getPublis } from "../services/Publicidades";

type PostAction = 
    | {type: "addPost", payload: {post: Post}}
    | {type: "addPosts", payload: Post[]}
    | {type: "deletePost", payload: {id: number}}
    | {type: "changeDurationPost", payload: {idd: number, newData: number}}

export const postsReducer = (state: PostState, action: PostAction): PostState => {
    
    switch (action.type) {
        case "addPost":
            return {
                ...state,
                Posts: [...state.Posts, action.payload.post]
            }
        case "deletePost":
            const { id } = action.payload;
            return {
                ...state,
                Posts: state.Posts.filter((post) => post.id !== id),
            }

            case "addPosts":
            const data = action.payload
            return {
                ...state,
                Posts: data
            }

            case "changeDurationPost":
                const { idd, newData } = action.payload;
                return {
                    ...state,
                    Posts: state.Posts.map(post => 
                        post.id === idd ? { ...post, newData } : post
                    ),
                };


        default:
            return state;
    }

}