import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'
import { Grid } from '@material-ui/core'


const Posts = ({ syncPosts }) => {
  if (!syncPosts.length) {
    return <p className='text-center'>No Posts Yet</p>
  }
  return (
    <Grid container spacing={2}>
      {syncPosts.map(post => (
        <Grid item xs key={post.id}>
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    syncPosts: state.posts.posts

  }
}

export default connect(mapStateToProps, null)(Posts)