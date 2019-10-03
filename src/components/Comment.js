import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'
import { Link  } from 'react-router-dom'



class Comment extends Component {

  vote(comment) {

  }

  render() {
    const { comment, post } = this.props
    console.log("Comment", comment)

    return (
        <div className="comment-frame">
            <div className="comment-header">{comment.author} responded at {formatDate(comment.timestamp)}</div>
            <div className="comment-main">
                <div className="comment-vote">
                  <button className='btn' onClick={() => this.vote(comment, 1)}>UP</button>
                  <p>{comment.voteScore}</p>
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
                    <button className='btn' onClick={() => this.deletePost(comment, comment.id)}>DELETE</button>
                   </p>
                </div>
            </div>
        </div>
    )
  }
}


export default Comment
