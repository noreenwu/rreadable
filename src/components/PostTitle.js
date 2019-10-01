import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import { countVote } from '../actions/posts'

class PostTitle extends Component {


  vote(post, plusMinus) {
    const { dispatch } = this.props

    console.log("vote", post.id, plusMinus)

    dispatch(countVote(post, post.id, plusMinus))
  }



  render() {
    const { post } = this.props

    return (

      <div className="post-main">
        <div className="post-vote">
          <p onClick={() => this.vote(post, 1)}>UP</p>
          <p onClick={() => this.vote(post, -1)}>DOWN</p>

        </div>
        <Link to={`/${post.category}/${post.id}`}>
          <div className="post-title">
            <span className="vote-img">score: {post.voteScore}</span> {post.title}
          </div>
        </Link>
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
