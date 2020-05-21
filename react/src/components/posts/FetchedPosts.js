import React from 'react'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../store/actions/posts'
import { Button } from '@material-ui/core'
import Loader from '../Loader'


export default () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.fetchedPosts)
  const loading = useSelector(state => state.app.loading)

  if (loading) {
    return <Loader />
  }

  if (!posts.length) {
    return <Button
      color="primary"
      variant="contained"
      onClick={() => dispatch(fetchPosts())}
    >Download</Button>
  }
  return posts.map(post => (
    <div style={{ paddingBottom: 20 }} key={post.id}>
      <Post post={post} />
    </div>
  )

  )
}