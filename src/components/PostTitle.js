import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter  } from 'react-router-dom'
import { countVote, deletePost } from '../actions/posts'
import { saveVote, sDeletePost } from '../utils/PostsAPI'

class PostTitle extends Component {


  vote(post, plusMinus) {
    const { dispatch } = this.props

    console.log("vote", post.id, plusMinus)

    dispatch(countVote(post, post.id, plusMinus))
    saveVote(post.id, plusMinus)

  }

  editPost(post) {
    const path = `/${post.category}/${post.id}/edit`
    this.props.history.push(path);

  }

  deletePost(post, postid) {
    let gotoPath

    const { dispatch } = this.props
    const { pathname } = this.props.location;
    let lastPathPiece = pathname.split('/').pop()
    console.log("lastPathPiece ", lastPathPiece)
    if (lastPathPiece === postid) {
       // after deletion, navigate to the category
       gotoPath = `/${post.category}`
    }

    console.log("delete post")
    dispatch(deletePost(postid))


    // notify the server that the post has been deleted
    sDeletePost(postid)

    // determine through the url (Route) if you need to navigate away or not
    console.log("go to path: ", gotoPath)
    if ( gotoPath ) {
      this.props.history.push(gotoPath);
    }

  }


  render() {
    const { post } = this.props


    return (

      <div className="post-main">
        <div className="post-vote">
          <button className='btn' onClick={() => this.vote(post, 1)}>UP</button>
          <p>{post.voteScore}</p>
          <button className='btn' onClick={() => this.vote(post, -1)}>DOWN</button>

        </div>
        <div className="post-title">
            <Link to={`/${post.category}/${post.id}`}>
                {post.title}
            </Link>
        </div>

        <div className="post-edit-controls">
           
           <Link to={{
                pathname: `/${post.category}/${post.id}/edit`,
                state: { post: post
                  }
                }}>

               <button className='btn'>EDIT LINK</button>
           </Link>
           <button className='btn' onClick={() => this.deletePost(post, post.id)}>DELETE</button>
        </div>

      </div>
    )

  }
}


function mapStateToProps({posts}, {id}) {
  const post = posts[id]

  return {
    post
  }
}

export default withRouter(connect(mapStateToProps)(PostTitle))
