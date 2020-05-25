import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

export default ({ post }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Title:
          </Typography>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
      </CardContent>
    </Card>
  )
}