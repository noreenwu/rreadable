import React, { Component } from 'react'
import Header from './Header'
import { saveCommentEdits } from '../utils/PostsAPI'

class EditComment extends Component {

  constructor(props) {
    super(props)
    let post = this.props.location.state

    this.state = {
      post: post,
      id: '',
      body: '',
      author: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
      const { post, comment } = this.props.location.state

      let pathname = this.props.location.pathname
      let newpath = pathname.split('/').slice(0, -2).join('/')

      this.setState({
        post: post,
        id: comment.id,
        author: comment.author,
        body: comment.body,
        gotoLocation: newpath
      })
  }


  updateComment(comment) {
    saveCommentEdits(comment)
  }

  handleSubmit(e) {
      e.preventDefault()

      const newComment = {
        id: this.state.id,
        timestamp: Date.now(),               // update the timestamp
        body: this.state.body
      }

      this.updateComment(newComment)

      // navigate back to parent post
      this.props.history.push(this.state.gotoLocation)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {

     return (
        <div>
          <Header/>
          <h3>Edit Comment</h3>
          <div className="post-frame">
          <div className="message">You are responding to: <span className="strong">{this.state.post.title}</span></div>

          <form onSubmit={this.handleSubmit}>
            <textarea
              size={80}
              name='body'
              placeholder='your comment here'
              value={this.state.body} onChange={this.handleChange} /><br/>

            <button
              className='btn'
              type='submit'
              disabled={ this.state.body === '' }>
                Submit
            </button>
          </form>
          </div>
        </div>
     )
  }
}


export default EditComment
