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
  
  const subredditList = [
    {
      name: '/r/beerporn',
      url: 'https://www.reddit.com/r/beerporn/'
    },
    {
      name: '/r/patiogardening',
      url: 'https://www.reddit.com/r/patiogardening/'
    },
    {
      name: '/r/reactjs',
      url: 'https://www.reddit.com/r/reactjs/'
    },
    {
      name: '/r/sourdough',
      url: 'https://www.reddit.com/r/Sourdough/'
    },
    {
      name: '/r/pizza',
      url: 'https://www.reddit.com/r/Pizza/'
    },
    {
      name: '/r/videos',
      url: 'https://www.reddit.com/r/videos/'
    },
  ]

  useEffect(() => {
    dispatch(getPosts(`https://www.reddit.com${subreddit}.json?limit=100`));
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
