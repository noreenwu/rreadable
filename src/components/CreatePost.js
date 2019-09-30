import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleNewPost } from '../actions/shared'
import { getNewId } from '../utils/helpers'

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


  handleChange(e) {
    console.log("handleChange", e.target.name, e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props

    let newId = getNewId()

    const dummyPost = { [newId] : { id: newId,
                                  timestamp: Date.now(),
                                  title: this.state.title,
                                  body: this.state.body,
                                  author: this.state.author,
                                  voteScore: 1,
                                  commentCount: 0,
                                  category: this.state.category
                                }
                      }

   dispatch(handleNewPost(dummyPost))

   this.setState(() => ({
         title: '',
         body: '',
         author: ''
    }))
   // clear the form fields
    // this.setState = ({
    //   title: '',
    //   body: '',
    //   author: ''
    // })


  }

  render() {
    const { categories } = this.props
    console.log("CreatePost categories ", categories)
    return(
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

    )
  }
}


function mapStateToProps( {categories}) {

  return{
      categories: Object.values(categories)
  }

}
export default connect(mapStateToProps)(CreatePost)
