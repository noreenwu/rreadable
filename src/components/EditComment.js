import React, { Component } from 'react'



class EditComment extends Component {

  componentDidMount() {
      const { post } = this.props.location.state

      const { id, title, author, body, category } = post

      console.log("EditPost componentDidMount ", post.title)
      this.setState({
        id: id,
        title: title,
        author: author,
        body: body,
        category: category
      })
  }

  state = {
    id: '',
    title: '',
    author: '',
    body: '',
    category: ''
  }
  render() {


     return (
        <div>
          <div>Respond to...</div>
          <h3>{this.state.title}</h3>
          <div>Edit Comment</div>
        </div>
     )
  }
}


export default EditComment
