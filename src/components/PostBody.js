import React from 'react'
import { connect } from 'react-redux'


function PostBody ( props ) {
  const { post } = props

  return (
        <div className="post-body">
           {post.body}
        </div>

  )
}


function mapStateToProps({posts}, {id}) {
  const post = posts[id]

  return {
    post
  }
}

export default connect(mapStateToProps)(PostBody)
