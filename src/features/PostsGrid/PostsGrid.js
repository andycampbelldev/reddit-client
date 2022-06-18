import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { selectPosts, selectPostsIsLoading, selectPostsHasError } from "./PostsSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";

import { Row, Col } from "reactstrap";
import PostCard from "../../components/PostCard/PostCard";

function PostsGrid() {
    const posts = useSelector(selectPosts);
    const isLoading = useSelector(selectPostsIsLoading);
    const hasError = useSelector(selectPostsHasError);
    if(isLoading) {
        return (
            <Row>
                <PostCard key={uuidv4()} isLoading={true}/>
                <PostCard key={uuidv4()} isLoading={true}/>
                <PostCard key={uuidv4()} isLoading={true}/>
                <PostCard key={uuidv4()} isLoading={true}/>
                <PostCard key={uuidv4()} isLoading={true}/>
                <PostCard key={uuidv4()} isLoading={true}/>
            </Row>
        ) 
    }
    if(hasError) {
        return <Row><FontAwesomeIcon className='fa-5x' icon={faHeartBroken} /></Row>
    }

    return (
        <Row>
            {posts.map(post => 
                <PostCard key={uuidv4()} data={post.data} />
            )}
        </Row>
    )

}

export default PostsGrid