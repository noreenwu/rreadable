import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'


class PostListItem extends Component {

  render() {
    const { post } = this.props
    console.log("the single post: ", post.title)
    return(
      <div className="post-frame">

          <div className="post-header">

            <span className="category-name">{post.category} </span>&nbsp; Posted by {post.author} &nbsp;
               at {formatDate(post.timestamp)}
          </div>

          <div className="post-info">

            <div className="post-main">
                <span className="post-title"><span className="vote-img">score: {post.voteScore}</span> {post.title}</span>
             </div>
          </div>

      </div>
    )
  }
}


function mapStateToProps({posts}, {id}) {
  const post = posts[id]
  return {
     post: post,
  }
}

export default connect(mapStateToProps)(PostListItem)
