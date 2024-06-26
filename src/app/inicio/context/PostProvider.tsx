'use client'

import {useReducer } from "react";
import { Post, PostState } from "../interfaces/interfaces";
import { PostsContext } from "./PostContex";
import { postsReducer } from "./PostReducer";
import { getPublis} from "../services/Publicidades";


interface props {
    children: JSX.Element | JSX.Element[]
}

const INITIAL_STATE: PostState = {
    Posts: []
}

export const PostsProvider = ({children}: props) => {
    
    const [postsState, dispatch] = useReducer(postsReducer,INITIAL_STATE)


    const deletePost = (id: number) => {
        dispatch({ type: 'deletePost', payload: {id}})
    }

    const setPost = (post: Post) => {
        dispatch({ type: 'addPost', payload: {post}})
    }

    const setPosts = async() => {
        const publisData = await getPublis()
        
        dispatch({ type: 'addPosts', payload: publisData})
    }

    return (
        <PostsContext.Provider value={{
            postsState,
            setPost,
            deletePost,
            setPosts
        }}>
            {children}
        </PostsContext.Provider>
    )
}