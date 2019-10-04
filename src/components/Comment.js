import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import { Link, withRouter  } from 'react-router-dom'
// import { connect } from 'react-redux'
import { saveCommentVote } from '../utils/PostsAPI'


class Comment extends Component {

  vote(comment, plusMinus) {


    console.log("comment vote", comment.id, plusMinus, this.state.voteScore)

    let newVoteScore = this.state.voteScore + plusMinus
    this.setState({
      voteScore: newVoteScore
    })

    saveCommentVote(comment.id, plusMinus)

  }

  componentDidMount() {
     const {voteScore} = this.props.comment

     this.setState({
       voteScore: voteScore
     })
  }

  deleteComment() {
     console.log("deleteComment")
  }

  state = {
    voteScore: 0
  }

  render() {
    const { comment, post } = this.props
    //console.log("Comment", comment)

    return (
        <div className="comment-frame">
            <div className="comment-header">{comment.author} responded at {formatDate(comment.timestamp)}</div>
            <div className="comment-main">
                <div className="comment-vote">
                  <button className='btn' onClick={() => this.vote(comment, 1)}>UP</button>
                  <p>{this.state.voteScore}</p>
                  <button className='btn' onClick={() => this.vote(comment, -1)}>DOWN</button>

                </div>
                <div className="comment-body">
                  {comment.body}
                </div>
                <div className="comment-edit-controls">


                   <Link to={{
                        pathname: `/${post.category}/${post.id}/${comment.id}/editcomment`,
                        state: { post: post
                          }
                        }}>

                       <button className='btn'>EDIT</button>
                   </Link>
                   <p>
                    <button className='btn' onClick={() => this.deleteComment(comment, comment.id)}>DELETE</button>
                   </p>
                </div>
            </div>
        </div>
    )
  }
}


// export default withRouter(connect(null, null)(Comment))

export default Comment
