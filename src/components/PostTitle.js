import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter  } from 'react-router-dom'
import { countVote, deletePost } from '../actions/posts'
import { saveVote, saveDeletePost } from '../utils/PostsAPI'
import UpArrow from '../images/up-arrow-blue.png'
import DownArrow from '../images/down-arrow-blue.png'

class PostTitle extends Component {

  vote(post, plusMinus) {
    const { dispatch } = this.props

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
    if (lastPathPiece === postid) {
       // after deletion, navigate to the category
       gotoPath = `/${post.category}`
    }

    dispatch(deletePost(postid))

    // notify the server that the post has been deleted
    saveDeletePost(postid)

    // determine through the url (Route) if you need to navigate away or not:
    // navigate away if user is on the PostDetail page (go to that post's category page)
    // otherwise, staying where you are is fine (category or all categories views)
    if ( gotoPath ) {
      this.props.history.push(gotoPath);
    }

  }


  render() {
    const { post } = this.props

    return (

      <div className="post-main">
        <div className="post-vote">
          <img src={UpArrow}
               alt="UP"
               onClick={() => this.vote(post, 1)}
               />
          <p>score</p>     
          <p className="strong">{post.voteScore}</p>
          <img src={DownArrow}
               alt="DOWN"
               onClick={() => this.vote(post, -1)}
               />

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

               <button className={`btn btn-function`}>Edit</button>
           </Link>
           <button className={`btn btn-function`} onClick={() => this.deletePost(post, post.id)}>Delete</button>
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
