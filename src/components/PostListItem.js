import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostHeader from './PostHeader'
import PostTitle from './PostTitle'

class PostListItem extends Component {

  render() {
    const { post } = this.props

    if (post === null) {
       console.log("PostListItem got invalid id")
       return null
    }
    console.log("PostListItem post ", post)
    return(
      <div className="post-frame">

          <PostHeader id={post.id}/>

          <div className="post-info">

                <PostTitle id={post.id}/>

          </div>

      </div>
    )
  }
}


function mapStateToProps({posts}, ownProps) {
  const { id } = ownProps
  if (id === undefined) {
    return {
      post: null
    }
  }

  const post = posts[id]
  return {
     post: post,
  }
}

export default connect(mapStateToProps)(PostListItem)
