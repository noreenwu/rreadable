import React, { Component } from 'react'
import { getNewId } from '../utils/helpers'
import { saveComment } from '../utils/PostsAPI'
import { connect } from 'react-redux'
import { updateCommentCount } from '../actions/posts'

class NewComment extends Component {

  constructor(props) {
    super(props)
    let post = this.props.location.state

    this.state = {
      post: post,
      body: '',
      author: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount() {
    console.log("NewComment componentDidMount ", this.props.location)
    let post = this.props.location.state
    let pathname = this.props.location.pathname
    let newpath = pathname.split('/').slice(0, -1).join('/')
    console.log("nextpath ", newpath)

    this.setState({
      post: post,
      gotoLocation: newpath
    })

  }

  // state = {
  //   post: {},
  //   author: '',
  //   title: '',
  //   body: ''
  //
  // }

  handleSubmit(event) {
     event.preventDefault()

     // save the comment
     const newComment = {
        id: getNewId(),
        timestamp: Date.now(),
        body: this.state.body,
        author: this.state.author,
        parentId: this.state.post.id
     }

     // save the new comment in the server
     saveComment(newComment)

     // update the parent post's commentCount in redux
     const { dispatch } = this.props
     dispatch(updateCommentCount(this.state.post))

     // navigate back to parent post
     this.props.history.push(this.state.gotoLocation)

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {

    // const { pathname } = this.props.location;
    // console.log("NewComment path ", pathname)

    console.log("post was ", this.state.post)

    return(
       <div>NewComment
        <div>
          <div>

          <form onSubmit={this.handleSubmit}>

          <input
            className='input-half'
            type='text'
            name='author'
            placeholder='your name here'
            value={this.state.author}
            onChange={this.handleChange}
          /><br/>

          <textarea
            size={80} name='body'
            placeholder='your comment here'
            value={this.state.body} onChange={this.handleChange} /><br/>

          <button
            className='btn'
            type='submit'
            disabled={ this.state.title === '' || this.state.body === '' || this.state.author === '' }>
              Submit
          </button>
          </form>

          </div>

        </div>

       </div>


    )
  }
}


// function mapStateToProps({posts}, ownProps) {
//   const path = ownProps.location.pathname
//
//   const { id } = ownProps
//   if (id === undefined) {
//     return {
//       post: null
//     }
//   }
//
//   const post = posts[id]
//   return {
//      post: post,
//   }
// }
// function mapStateToProps({posts}, ownProps) {
//   const path = ownProps.location.pathname
//   console.log("NewComment mapStateToProps", path)
//   let pathParts = path.split('/')
//   let pathLastSeg = pathParts.pop()
//   pathLastSeg = pathParts.pop()
//   console.log("NewComment postid ", pathLastSeg)
//
//   const post = posts[pathLastSeg]
//   console.log("map returning post ", posts)
//   return {
//     post: post,
//     hello: 1
//   }
//
// }

//export default NewComment
export default connect(null, null)(NewComment)
