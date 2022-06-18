import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { selectPosts, selectPostsIsLoading, selectPostsHasError } from './PostsSlice';

import { Row } from 'reactstrap';
import PostCard from '../../components/PostCard/PostCard';


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
        return <p className='text-center'>Could not load Posts. Please try again.</p>
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