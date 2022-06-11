import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDisplayingPost } from './features/Post/PostSlice';
import { getSubredditsInfo, selectAllSubreddits, selectCurrentSubreddit } from './features/SubredditNav/SubredditSlice';
import { getPosts } from './features/PostsGrid/PostsSlice';

import Navbar from './components/Navbar/Navbar';
import SubredditNav from './features/SubredditNav/SubredditNav';
import PostsGrid from './features/PostsGrid/PostsGrid';
import PostDetail from './features/Post/Post';
import Footer from './components/Footer/Footer';


import { Container } from 'reactstrap';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const displayingPost = useSelector(selectDisplayingPost);
  const subreddit = useSelector(selectCurrentSubreddit);
  
  const allSubreddits = useSelector(selectAllSubreddits)

  useEffect(() => {
    dispatch(getSubredditsInfo(allSubreddits));
  }, []);

  useEffect(() => {
    if(subreddit) {
      dispatch(getPosts(`https://www.reddit.com/r/${subreddit}.json?limit=100`));
    }
  }, [subreddit, dispatch]);

  return (
    <>
      <PostDetail show={displayingPost} />
      <Navbar />
      <SubredditNav subreddits={allSubreddits} />
      <Container className='mt-5'>
        <PostsGrid />
      </Container>
      <Footer />
    </>
  );
}

export default App;
