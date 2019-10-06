import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { saveEditedPost } from '../actions/posts'
import { savePostEdits } from '../utils/PostsAPI'
import Header from './Header'
import { formatDate } from '../utils/helpers'

class EditPost extends Component {

  componentDidMount() {
      const { post } = this.props.location.state

      const { id, title, author, body, category, timestamp } = post

      this.setState({
        id: id,
        title: title,
        author: author,
        body: body,
        category: category,
        timestamp: timestamp
      })
  }

  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      author: '',
      body: '',
      category: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }


  handleChange(e) {
    console.log("handleChange", e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props

    let postId = this.state.id

    const editedPost = { [postId] : { id: postId,
                                      timestamp: Date.now(),
                                      title: this.state.title,
                                      body: this.state.body,
                                    }
                       }


   dispatch(saveEditedPost(editedPost, postId))
   savePostEdits(editedPost[postId])

    // navigate to category page
    const path = `/${this.state.category}/${postId}`
    this.props.history.push(path);


  }

  render() {

    return(
       <Fragment>
         <Header />
         <h3>Edit Post </h3>
         <div className="post-frame">
            <div className="post-header">
                <div>Category <span className="category">{this.state.category}</span></div>
                <div>Posted by <span className="author">{this.state.author}</span></div>
                <div>{formatDate(this.state.timestamp)}</div>
            </div>
            <form onSubmit={this.handleSubmit}>



              <input
                type='text'
                name='title'
                placeholder='enter title for your post here'
                size={80}
                value={this.state.title}
                onChange={this.handleChange}
              />

              <textarea
                size={80} name='body'
                placeholder='the body of your post here'
                value={this.state.body} onChange={this.handleChange} /><br/>

              <button
                className='btn'
                type='submit'
                disabled={ this.state.title === '' || this.state.body === '' }>
                  Submit
              </button>

            </form>
         </div>
       </Fragment>
    )
  }
}


function mapStateToProps( {categories} ) {

  return{
      categories: Object.values(categories)
  }
}

export default connect(mapStateToProps)(EditPost)
