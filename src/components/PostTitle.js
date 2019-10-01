import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import { countVote, deletePost } from '../actions/posts'
import { saveVote } from '../utils/PostsAPI'

class PostTitle extends Component {


  vote(post, plusMinus) {
    const { dispatch } = this.props

    console.log("vote", post.id, plusMinus)

    dispatch(countVote(post, post.id, plusMinus))
    saveVote(post.id, plusMinus)

  }

  deletePost(postid) {
    const { dispatch } = this.props

    console.log("delete post")
    dispatch(deletePost(postid))
  }


  render() {
    const { post } = this.props

    return (

      <div className="post-main">
        <div className="post-vote">
          <button className='btn' onClick={() => this.vote(post, 1)}>UP</button>
          <p>{post.voteScore}</p>
          <button className='btn' onClick={() => this.vote(post, -1)}>DOWN</button>

        </div>
        <div className="post-title">
            <Link to={`/${post.category}/${post.id}`}>
                {post.title}
            </Link>
        </div>

        <div className="post-edit-controls">
           <button className='btn'>EDIT</button>
           <button className='btn' onClick={() => this.deletePost(post.id)}>DELETE</button>
        </div>

      </div>
    )
  }
}


function mapStateToProps({posts}, {id}) {
  const post = posts[id]

  return {
    post
  }
}

export default connect(mapStateToProps)(PostTitle)
