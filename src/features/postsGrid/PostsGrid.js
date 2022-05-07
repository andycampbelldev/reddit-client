import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPosts, setPosts } from "./postsSlice";
import { selectSubreddit } from "../subredditNav/subredditSlice";

import { Container, Row } from "reactstrap";
import PostCard from "../../components/PostCard/PostCard";

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
    }, [subreddit, dispatch]);

    return (
        <Container className='mt-5'>
            <Row>
                {posts.map(post => <PostCard data={post.data}/>)}
            </Row>
        </Container>
    )

}

export default PostsGrid