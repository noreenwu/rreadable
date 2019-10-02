import React, { Component } from 'react'
import { formatDate } from '../utils/helpers'



class Comment extends Component {

  render() {
    const { comment } = this.props
    console.log("Comment", comment)

    return (
        <div className="comment-frame">
            <div className="comment-header">{comment.author} responded at {formatDate(comment.timestamp)}</div>
            <div className="comment-body">
              {comment.body}
            </div>
        </div>
    )
  }
}


export default Comment
