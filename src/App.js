import React from 'react';
import { useSelector } from 'react-redux';
import { selectDisplayingPost } from './features/post/postSlice';

import Navbar from './components/Navbar/Navbar';
import SubredditNav from './features/subredditNav/SubredditNav';
import PostsGrid from './features/postsGrid/PostsGrid';
import PostDetail from './features/post/Post';


import { Container } from 'reactstrap';

import './App.css';

function App() {
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
  ]
  const displayingPost = useSelector(selectDisplayingPost);
  return (
    <>
      <PostDetail show={displayingPost} />
      <Navbar />
      <SubredditNav subreddits={subredditList} />
      <Container className='mt-5'>
        <PostsGrid />
      </Container>
    </>
  );
}

export default App;
