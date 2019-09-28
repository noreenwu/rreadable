import React from 'react'
import { connect } from 'react-redux'
import { formatDate } from '../utils/helpers'


function PostDetail ( props ) {
  const {id, category} = props
  console.log("PostDetail ", id, category)
  if (id < 0) {
    return (
      <div>PostDetail: No posts with specified id</div>
    )
  }
  else {
    return(
      <div>PostDetail</div>
    )
  }
}

function mapStateToProps({posts}, ownProps) {
  const { post_id, category } = ownProps
  const id = post_id

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
