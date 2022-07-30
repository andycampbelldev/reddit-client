import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectActivePostId, selectDisplayingPost } from './features/Post/PostSlice';
import { getSubredditsInfo, selectAllSubreddits, selectCurrentSubreddit } from './features/SubredditNav/SubredditSlice';
import { selectPosts, getPosts } from './features/PostsGrid/PostsSlice';
import { selectDarkMode } from './features/Theme/ThemeSlice';

import Navbar from './components/Navbar/Navbar';
import SubredditNav from './features/SubredditNav/SubredditNav';
import PostsGrid from './features/PostsGrid/PostsGrid';
import PostDetail from './features/Post/Post';
import Footer from './components/Footer/Footer';


import { Container } from 'reactstrap';
import { SkeletonTheme } from 'react-loading-skeleton';

import './App.css';
import './features/Theme/Theme.css';

function App() {
  const dispatch = useDispatch();
  const displayingPost = useSelector(selectDisplayingPost);
  const subreddit = useSelector(selectCurrentSubreddit);
  const allPosts = useSelector(selectPosts);
  const activePostId = useSelector(selectActivePostId);
  const allSubreddits = useSelector(selectAllSubreddits)
  const darkMode = useSelector(selectDarkMode);

  const activePost = allPosts.find(p => p.data.id === activePostId);

  useEffect(() => {
    dispatch(getSubredditsInfo(allSubreddits));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(subreddit) {
      dispatch(getPosts(`https://www.reddit.com/r/${subreddit}.json?limit=50`));
    }
  }, [subreddit, dispatch]);

  return (
    <SkeletonTheme baseColor={darkMode ? '#0d0e34' : ''} highlightColor={darkMode ? '#18003a' : ''}>
      <main className={`App-Container ${darkMode ? 'dark' : 'light'}`}>
        {activePost && <PostDetail show={displayingPost} data={activePost.data} />}
        <header>
          <Navbar />
        </header>
        <main>
          <SubredditNav subreddits={allSubreddits} />
          <Container>
            <PostsGrid />
          </Container>
        </main>
        <footer>
          <Footer />
        </footer>
      </main>
    </SkeletonTheme>
  );
}

export default App;
