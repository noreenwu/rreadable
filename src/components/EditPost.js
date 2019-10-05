import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { saveEditedPost } from '../actions/posts'
import { savePostEdits } from '../utils/PostsAPI'
import Header from './Header'


class EditPost extends Component {

  componentDidMount() {
      const { post } = this.props.location.state

      const { id, title, author, body, category } = post

      this.setState({
        id: id,
        title: title,
        author: author,
        body: body,
        category: category
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
    // const { categories } = this.props
    console.log("EditPost ", this.state)


    return(
       <Fragment>
         <Header />

         <div className="container">
            <h3>Edit Post </h3>
            <form onSubmit={this.handleSubmit}>
              author: {this.state.author}
              <br/>

              category: {this.state.category}
              <br/>

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
