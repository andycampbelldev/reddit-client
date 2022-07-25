import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { selectPosts, selectPostsIsLoading, selectPostsHasError } from './PostsSlice';
import { selectSearchedTerm } from '../SearchForm/SearchTermSlice';
import { selectCurrentSubreddit } from '../SubredditNav/SubredditSlice';

import { Row } from 'reactstrap';
import SearchResultsHeader from '../../components/SearchResultsHeader/SearchResultsHeader';
import PostCard from '../../components/PostCard/PostCard';

function PostsGrid() {
    const posts = useSelector(selectPosts);
    const isLoading = useSelector(selectPostsIsLoading);
    const hasError = useSelector(selectPostsHasError);
    const searchedTerm = useSelector(selectSearchedTerm);
    const subreddit = useSelector(selectCurrentSubreddit);

    if(isLoading) {
        return (
            <>
                {searchedTerm && !subreddit && <SearchResultsHeader searchedTerm={searchedTerm} />}
                <Row>
                    <PostCard key='postcard-skeleton-1' isLoading={true}/>
                    <PostCard key='postcard-skeleton-2' isLoading={true}/>
                    <PostCard key='postcard-skeleton-3' isLoading={true}/>
                    <PostCard key='postcard-skeleton-4' isLoading={true}/>
                    <PostCard key='postcard-skeleton-5' isLoading={true}/>
                    <PostCard key='postcard-skeleton-6' isLoading={true}/>
                </Row>
            </>
        ) 
    }

    if(hasError) {
        return <p className='text-center'>Could not load Posts. Please try again.</p>
    }

    return (
        <>
            {searchedTerm && !subreddit && <SearchResultsHeader searchedTerm={searchedTerm} />}
            <Row>
                {posts.map(post => 
                    <PostCard key={post.data.id} data={post.data} />
                )}
            </Row>
        </>
    )

}

export default PostsGrid