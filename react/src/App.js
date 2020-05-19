import React from 'react';
import PostForm from './components/PostForm';
import FetchedPosts from './components/FetchedPosts';
import Posts from './components/Posts';
import MouseTracker from './components/MouseTracker/MouseTracker';

function App() {
  return (
    <div className="container pt-3">
      <div className="row">
        <div className="col">
          <PostForm />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Sync Posts</h2>
          <Posts />
        </div>
        <div className="col">
          <h2>Async Posts</h2>
          <FetchedPosts />
        </div>
      </div>
      <MouseTracker />
    </div>
  );
}

export default App;
