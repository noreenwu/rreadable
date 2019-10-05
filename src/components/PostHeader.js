import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'


function PostHeader ( props ) {
  const { post } = props

  const commentLabel = commentPlur(post.commentCount)

  return (

    <div className="post-header">
      <div className="category-name">{post.category} </div>
      <div className="post-header-author">Posted by {post.author}</div>
      <div className="post-header-timestamp">{formatDate(post.timestamp)}</div>
      <div className="comment-count">{post.commentCount} {commentLabel}</div>
    </div>
  )
}

function commentPlur(numComments) {
   if (numComments === 1) {
     return 'comment'
   }
   else {
     return 'comments'
   }
}


function mapStateToProps({posts}, {id}) {
  const post = posts[id]

  return {
    post
  }
}

export default connect(mapStateToProps)(PostHeader)
