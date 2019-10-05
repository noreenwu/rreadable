import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleNewPost } from '../actions/posts'
import { getNewId } from '../utils/helpers'
import CategoryNav from './CategoryNav'


class CreatePost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      body: '',
      author: '',
      category: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
      let { category } = this.props.location.state

      if (category === 'all') {
        category =''
      }

      this.setState({
        category: category
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props
    let newId = getNewId()

    const newPost = { [newId] : { id: newId,
                                  timestamp: Date.now(),
                                  title: this.state.title,
                                  body: this.state.body,
                                  author: this.state.author,
                                  voteScore: 1,
                                  commentCount: 0,
                                  category: this.state.category
                                }
                      }

   dispatch(handleNewPost(newPost, newId))


   this.setState(() => ({
         title: '',
         body: '',
         author: ''
    }))

    // navigate to the category in which the new post was posted
    let gotoPath = `/${this.state.category}`
    this.props.history.push(gotoPath)

  }

  render() {
    const { categories } = this.props
    // console.log("CreatePost categories ", categories)
    return(
       <Fragment>
         <CategoryNav/>
         <h3>New Post</h3>
         <div className="container">
            <form onSubmit={this.handleSubmit}>
              <input
                className='input-half'
                type='text'
                name='author'
                placeholder='enter your name here'
                value={this.state.author}
                onChange={this.handleChange}
              /><br/>

              <select value={this.state.category}
                      name='category'
                      onChange={(event) => this.handleChange(event)}>
                         <option key={'default'} value=''>Select category</option>
                      { categories.map( v =>
                          <option key={v.name} value={v.name}>{v.name}</option>
                      )}

              </select><br/>

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
                disabled={this.state.title === '' || this.state.body === '' || this.state.author === '' || this.state.category === '' }>
                  Submit
              </button>

            </form>
         </div>
       </Fragment>
    )
  }
}


function mapStateToProps( {categories}) {


  return{
      categories: Object.values(categories)
  }

}
export default connect(mapStateToProps)(CreatePost)
