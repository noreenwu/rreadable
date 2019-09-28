import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'


class PostListItem extends Component {

  render() {
    const { post } = this.props
    console.log("the single post: ", post.title)
    return(
      <div>PostListItem post: By {post.author} {post.title} {formatDate(post.timestamp)}
                                 vote score: {post.voteScore} (category is: {post.category})
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
