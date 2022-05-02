import React from 'react';
import Navbar from './components/Navbar/Navbar';
import SubredditContainer from './containers/SubredditContainer/SubredditContainer';

import './App.css';

function App() {
  const subredditList = [
    {
      name: 'homebrewing',
      url: 'https://www.reddit.com/r/Homebrewing/'
    },
    {
      name: 'patiogardening',
      url: 'https://www.reddit.com/r/patiogardening/'
    },
    {
      name: 'reactjs',
      url: 'https://www.reddit.com/r/reactjs/'
    },
    {
      name: 'sourdough',
      url: 'https://www.reddit.com/r/Sourdough/'
    },
    {
      name: 'pizza',
      url: 'https://www.reddit.com/r/Pizza/'
    },
  ]
  return (
    <div>
      <Navbar />
      <SubredditContainer list={subredditList} />
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // </div>
  );
}

export default App;
