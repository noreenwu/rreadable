export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'

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
