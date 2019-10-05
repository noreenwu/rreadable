import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostTitle from './PostTitle'
import PostBody from './PostBody'
import { getComments } from '../utils/PostsAPI'
import Header from './Header'
import Comment from './Comment'

class PostDetail extends Component {

  state = {
     comments: [],
     commentsLoaded: false
  }

  componentDidMount() {
    let { id } = this.props

    if ( id === -1 ) {
      id = this.props.match.params.post_id
    }

    this.loadComments(id, this)

  }

  loadComments(id, p) {
    console.log("load comments in Post Detail")
    getComments (id)
      .then((comments) => {
        p.setState(() => ({
          comments,
          commentsLoaded: true
        }))
      })
  }

  render() {
    const {id, post} = this.props

    if (id < 0) {
      return (
        <div>PostDetail: No posts with specified id</div>
      )
    }
    else {
      return(
        <Fragment>
          <Header />
          <h3>{post.title}</h3>
          <div className="post-frame">
            <PostHeader id={post.id}/>
            <PostTitle id={post.id}/>
            <PostBody id={post.id}/>


            { this.state.comments.map( c =>
                <Comment key={c.id}
                         comment={c}
                         post={post}
                         loadComments={this.loadComments}
                         whichThis={this}
                      />
            )}


            <Link to={`/${post.category}`}>
               <div>Go to category listing</div>
            </Link>

            <Link to={'/'}>
               <div>Go to full listing</div>
            </Link>

            <Link to={{
                 pathname: `/${post.category}/${post.id}/newcomment`,
                 state: post
                 }}>
            <button className="btn">NEW COMMENT</button>
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
