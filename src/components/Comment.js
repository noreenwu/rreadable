import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { saveCommentVote, deleteComment } from '../utils/PostsAPI'
import { updateCommentCount } from '../actions/posts'


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



  deleteComment(commentid, loadComments, p) {

     deleteComment(commentid)

     const { dispatch, post } = this.props

     dispatch(updateCommentCount(post, -1))

     // force re-render
     this.setState({
       state: this.state,
     });

     loadComments(post.id, p)   // this lives in the parent, PostDetail
     //window.location.reload()
  }

  state = {
    voteScore: 0
  }

  render() {
    const { comment, post, loadComments, whichThis } = this.props


    return (
        <div className="comment-frame">
            <div className="comment-header">
              <div className="comment-header-author">{comment.author} responded</div>
              <div className="comment-header-date">{formatDate(comment.timestamp)}</div>
            </div>
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
                        state: { post: post,
                                 comment: comment,
                          }
                        }}>

                       <button className='btn'>EDIT</button>
                   </Link>
                   <p>
                    <button className='btn' onClick={() => this.deleteComment(comment.id, loadComments, whichThis)}>DELETE</button>
                   </p>
                </div>
            </div>
        </div>
    )
  }
}



export default withRouter(connect(null, null)(Comment))

// export default Comment
