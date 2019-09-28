import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'


class PostListItem extends Component {

  render() {
    const { post } = this.props

    return(
      <div className="post-frame">

          <div className="post-header">

            <span className="category-name">{post.category} </span>&nbsp; Posted by {post.author} &nbsp;
               at {formatDate(post.timestamp)}
          </div>

          <div className="post-info">

            <div className="post-main">
                <span className="post-title">
                <span className="vote-img">score: {post.voteScore}</span> {post.title}</span>
                <div className="post-body">
                    {post.body}
                </div>
             </div>
          </div>

      </div>
    )
  }
}


function mapStateToProps({posts}, ownProps) {
  const { id } = ownProps
  console.log("postlistitem ownProps", ownProps)
  const post = posts[id]
  return {
     post: post,
  }
}

export default connect(mapStateToProps)(PostListItem)
