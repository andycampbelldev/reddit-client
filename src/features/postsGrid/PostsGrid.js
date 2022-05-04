import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, setPosts } from "./postsSlice";
import { selectSubreddit } from "../subredditNav/subredditSlice";

function PostsGrid(props) {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const subreddit = useSelector(selectSubreddit);
    const url = 'https://www.reddit.com'

    //Fetch posts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}${subreddit}.json?limit=100`);
                if (response.ok) {
                    const jsonResponse = await response.json();
                    dispatch(setPosts(jsonResponse.data.children))
                } else {
                    throw new Error(`Something went wrong: ${response.status}`)
                }
    
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [subreddit]);

    return (
        <div className="row">

        </div>
    )

}

export default PostsGrid