import { RECEIVE_POSTS, ADD_POST, COUNT_VOTE } from '../actions/posts'

export default function posts (state = {}, action) {

  switch(action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        ...action.posts
      }

    case ADD_POST: {
      console.log("reducers ADD_POST post was ", action.post)
      return {
        ...state,
        ...action.post
      }
    }

    case COUNT_VOTE: {
      console.log("reducers COUNT_VOTE ", action.post, action.postid, action.vote)

      let newVoteScore = action.post.voteScore + action.vote
      return {
        ...state,
        [action.postid] : {
          ...state[action.postid],
          voteScore: newVoteScore
        }
      }
    }
    default :
      return state
   }
}
