'use client'

import { Post, PostState } from "../interfaces/interfaces";
import { getPublis } from "../services/Publicidades";

type PostAction = 
    | {type: "addPost", payload: {post: Post}}
    | {type: "addPosts", payload: Post[]}
    | {type: "deletePost", payload: {id: number}}

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
            console.log('sexo')
            const data = action.payload
            console.log(data)

            return {
                ...state,
                Posts: data
            }
        default:
            return state;
    }

}