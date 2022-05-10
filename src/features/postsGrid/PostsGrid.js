import React from "react";
import { useSelector } from "react-redux";
import { selectPosts, selectPostsIsLoading, selectPostsHasError } from "./postsSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import { Row, Col } from "reactstrap";
import PostCard from "../../components/PostCard/PostCard";

function PostsGrid() {
    const posts = useSelector(selectPosts);
    const isLoading = useSelector(selectPostsIsLoading);
    const hasError = useSelector(selectPostsHasError);
    if(isLoading) {
        return <Row><FontAwesomeIcon className='fa-spin fa-5x' icon={faSpinner} /></Row>
    }
    if(hasError) {
        return <Row><FontAwesomeIcon className='fa-5x' icon={faHeartBroken} /></Row>
    }

    return (
        <Row>
            {posts.map(post => 
                <PostCard 
                    url={post.data.url} 
                    title={post.data.title}
                    author={post.data.author} 
                    content={post.data.selftext} 
                    ups={post.data.ups} 
                    downs={post.data.downs}
                    data={post.data}
                />
            )}
        </Row>
    )

}

export default PostsGrid