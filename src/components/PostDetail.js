import React from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import { formatDate } from '../utils/helpers'


function PostDetail ( props ) {
  const {id, category, post} = props

  console.log("PostDetail ", id, category)
  if (id < 0) {
    return (
      <div>PostDetail: No posts with specified id</div>
    )
  }
  else {
    return(
      <div>PostDetail id was {id}
        <div>{post.title}</div>
        <div>{post.body}</div>
        <Link to={`/${post.category}`}>

           <div>Go to category listing</div>
        </Link>

        <Link to={'/'}>
           <div>Go to full listing</div>
        </Link>
      </div>

    )
  }
}

function mapStateToProps({posts}, ownProps) {
  const { post_id, category } = ownProps.match.params
  const id = post_id
  console.log("PostDetail the id was ", post_id)
  console.log("PostDetail the category was ", category)
  console.log("PostDetail ownProps were ", ownProps)
  const thePost = posts[id]

  if (thePost === undefined) {
    return {
      id: -1
    }
  }
  return {
    id,
    post: thePost,
    category
  }
}


export default connect(mapStateToProps)(PostDetail)
