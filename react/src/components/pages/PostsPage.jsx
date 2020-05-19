import React from "react";
import PostForm from "../posts/PostForm";
import FetchedPosts from "../posts/FetchedPosts";
import Posts from "../posts/Posts";
import MouseTracker from "../MouseTracker/MouseTracker";

const PostsPage = () => (
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

export default PostsPage;
