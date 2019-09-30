import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostTitle from './PostTitle'
import PostBody from './PostBody'
import { getComments } from '../utils/PostsAPI'

class PostDetail extends Component {

  state = {
     comments: [],
     commentsLoaded: false
  }

  render() {
    const {id, post} = this.props

    if (id < 0) {
      return (
        <div>PostDetail: No posts with specified id</div>
      )
    }
    else {
      if (this.state.commentsLoaded === false ) {
        getComments (id)
          .then((comments) => {
            this.setState(() => ({
              comments,
              commentsLoaded: true
            }))
          })
      }

      return(
        <Fragment>
          <h3>{post.title}</h3>
          <div className="post-frame">
            <PostHeader id={post.id}/>
            <PostTitle id={post.id}/>
            <PostBody id={post.id}/>

            { this.state.comments.map(com =>
                <li key={com.id}>{com.body}</li> )}

            <Link to={`/${post.category}`}>
               <div>Go to category listing</div>
            </Link>

            <Link to={'/'}>
               <div>Go to full listing</div>
            </Link>
          </div>
        </Fragment>
      )
    }
  }
}

function mapStateToProps({posts}, ownProps) {
  const { post_id } = ownProps.match.params
  const id = post_id
  const thePost = posts[id]

  if (thePost === undefined) {
    return {
      id: -1
    }
  }
  return {
    id,
    post: thePost,
  }
}


export default connect(mapStateToProps)(PostDetail)
