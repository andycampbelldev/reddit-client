import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActivePostId, selectDisplayingPost } from './features/Post/PostSlice';
import { getSubredditsInfo, selectAllSubreddits, selectCurrentSubreddit } from './features/SubredditNav/SubredditSlice';
import { selectPosts, getPosts } from './features/PostsGrid/PostsSlice';

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
  const allPosts = useSelector(selectPosts);
  const activePostId = useSelector(selectActivePostId);
  const allSubreddits = useSelector(selectAllSubreddits)

  const activePost = allPosts.find(p => p.data.id === activePostId);

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
      {activePost && <PostDetail show={displayingPost} data={activePost.data} />}
      <Navbar />
      <SubredditNav subreddits={allSubreddits} />
      <Container>
        <PostsGrid />
      </Container>
      <Footer />
    </>
  );
}

export default App;
