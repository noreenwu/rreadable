import React, { Component } from 'react'
import { connect } from 'react-redux'


class PostListItem extends Component {

  render() {
    const { posts, postAry, postKeys, id, p, p1 } = this.props
    console.log("postlistitem posts: ", posts, id)
    console.log("postlistitem postAry: ", postAry, id)
    console.log("postlistitem postKeys: ", postKeys, id)

    console.log("postListItem first post[0] ", p)
    console.log("postListItem one post from object ", p1)
    return(
      <div>PostListItem post:
      </div>
    )
  }
}


function mapStateToProps({posts}, {id}) {
  // const postsAry = Object.values(posts)
  const postAry = Object.values(posts)
  const postKeys = Object.keys(posts)
  const p = postAry[0]
  const p1 = posts[id]
  return {
     posts: posts,
     postAry: Object.values(posts),
     postKeys: postKeys,
     p: p,
     p1: p1
  }
}

export default connect(mapStateToProps)(PostListItem)
