import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'


function PostHeader ( props ) {
  const { post } = props

  return (

    <div className="post-header">

      <span className="category-name">{post.category} </span>&nbsp; Posted by {post.author} &nbsp;
         at {formatDate(post.timestamp)}&nbsp;  <span className="comment-count">{post.commentCount} comments</span>
    </div>
  )
}


function mapStateToProps({posts}, {id}) {
  const post = posts[id]

  return {
    post
  }
}

export default connect(mapStateToProps)(PostHeader)
