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
  return {
    type: ADD_POST,
    post
  }
}

export function saveEditedPost (post, postid) {
    return {
      type: SAVE_EDITED_POST,
      post,
      postid
    }
}

export function countVote (post, postid, vote) {
    return {
      type: COUNT_VOTE,
      post,
      postid,
      vote
    }

}

export function deletePost (postid) {
   return {
     type: DELETE_POST,
     postid
   }
}

export function updateCommentCount (post, change) {
  return {
    type: UPDATE_NUM_COMMENTS,
    post,
    change
  }
}

export function handleNewPost (post, id) {
  savePost(post[id])

  return (dispatch) => {
      dispatch(addPost(post))
  }
}
