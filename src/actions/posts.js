import { savePost } from '../utils/PostsAPI'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const COUNT_VOTE = 'COUNT_VOTE'
export const DELETE_POST = 'DELETE_POST'
export const SAVE_EDITED_POST = 'SAVE_EDITED_POST'
export const UPDATE_NUM_COMMENTS = 'UPDATE_NUM_COMMENTS'

export function receivePosts (posts) {
  return {
    type: RECEIVE_POSTS,
    posts,
  }
}

export function addPost (post) {
  console.log("actions/addPost post was ", post)
  return {
    type: ADD_POST,
    post
  }
}

export function saveEditedPost (post, postid) {
    console.log("actions/saveEditedPost ", post, postid)
    return {
      type: SAVE_EDITED_POST,
      post,
      postid
    }
}

export function countVote (post, postid, vote) {
    console.log("actions/countVote postid and vote", post, postid, vote)
    return {
      type: COUNT_VOTE,
      post,
      postid,
      vote
    }

}

export function deletePost (postid) {
   console.log("actions/deletePost postid", postid)

   return {
     type: DELETE_POST,
     postid
   }
}

export function updateCommentCount (post) {
  console.log("actions/updateCommentCount", post)

  return {
    type: UPDATE_NUM_COMMENTS,
    post
  }
}

export function handleNewPost (post, id) {
  console.log("shared: handleNewPost post was ", post[id])
  // return(dispatch) => {
  //    //return savePost(post)
  //    return(console.log("some API call"))
  //       .then ((post) => dispatch( addPost(post)))
  // }


  savePost(post[id])

  return (dispatch) => {
      dispatch(addPost(post))
  }
}
