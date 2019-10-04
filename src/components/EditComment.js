import React, { Component } from 'react'
import CategoryNav from './CategoryNav'
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
      console.log("newpath ", newpath)

      console.log("EditComment componentDidMount ", this.props.location, post, comment)
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
      console.log("handleSubmit")

      const newComment = {
        id: this.state.id,
        timestamp: Date.now(),
        body: this.state.body
      }

      this.updateComment(newComment)

      // navigate back to parent post
      this.props.history.push(this.state.gotoLocation)
  }

  handleChange(e) {

    console.log("handleChange", e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {


     return (
        <div>
          <CategoryNav/>
          <div>Respond to...<span className="strong">{this.state.post.title}</span></div>

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
     )
  }
}


export default EditComment
