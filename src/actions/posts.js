export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const COUNT_VOTE = 'COUNT_VOTE'
export const DELETE_POST = 'DELETE_POST'


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
