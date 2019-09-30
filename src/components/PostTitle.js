import React from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'


function PostTitle ( props ) {
  const { post } = props

  return (
    
    <div className="post-main">
      <Link to={`/${post.category}/${post.id}`}>
        <div className="post-title">
          <span className="vote-img">score: {post.voteScore}</span> {post.title}
        </div>
      </Link>
    </div>
  )
}


function mapStateToProps({posts}, {id}) {
  const post = posts[id]

  return {
    post
  }
}

export default connect(mapStateToProps)(PostTitle)
