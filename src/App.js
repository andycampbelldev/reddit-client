import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDisplayingPost } from './features/Post/PostSlice';
import { selectSubreddit } from './features/SubredditNav/SubredditSlice';
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
  const subreddit = useSelector(selectSubreddit);
  
  const subredditList = ['beerporn', 'patiogardening', 'reactjs', 'sourdough', 'pizza', 'videos']

  useEffect(() => {
    if(subreddit) {
      dispatch(getPosts(`https://www.reddit.com/r/${subreddit}.json?limit=100`));
    }
  }, [subreddit, dispatch]);

  return (
    <>
      <PostDetail show={displayingPost} />
      <Navbar />
      <SubredditNav subreddits={subredditList} />
      <Container className='mt-5'>
        <PostsGrid />
      </Container>
      <Footer />
    </>
  );
}

export default App;
