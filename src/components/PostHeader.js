import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'


function PostHeader ( props ) {
  const { post } = props

  const commentLabel = commentPlur(post.commentCount)

  return (

    <div className="post-header">

      <span className="category-name">{post.category} </span>&nbsp; Posted by {post.author} &nbsp;
         at {formatDate(post.timestamp)}&nbsp;  <span className="comment-count">{post.commentCount} {commentLabel}</span>
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
