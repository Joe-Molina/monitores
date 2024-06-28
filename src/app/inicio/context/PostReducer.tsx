'use client'

import { Post, PostState } from "../interfaces/interfaces";
import { getPublis } from "../services/Publicidades";

type PostAction = 
    | {type: "addPost", payload: {post: Post}}
    | {type: "addPosts", payload: Post[]}
    | {type: "deletePost", payload: {id: number}}
    | {type: "changeDurationPost", payload: {idd: number, newData: number}}
    | {type: "changePositionPost", payload: {id: number, newData: number}}
    | {type: "changeStartDatePost", payload: {id: number, newData: Date}}
    | {type: "changeEndDatePost", payload: {id: number, newData: Date}}

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
                        post.id === idd ? { ...post, duration: newData } : post
                    ),
                };

                case "changePositionPost":
                    return {
                        ...state,
                        Posts: state.Posts.map(post => 
                            post.id === action.payload.id ? { ...post, position: action.payload.newData } : post
                        ),
                    };

                    case "changeStartDatePost":
                        return {
                            ...state,
                            Posts: state.Posts.map(post => 
                                post.id === action.payload.id ? { ...post, fecha_inicio: action.payload.newData } : post
                            ),
                        };

                        case "changeEndDatePost":
                            return {
                                ...state,
                                Posts: state.Posts.map(post => 
                                    post.id === action.payload.id ? { ...post, Fecha_Fin: action.payload.newData } : post
                                ),
                            };
                                            


        default:
            return state;
    }

}