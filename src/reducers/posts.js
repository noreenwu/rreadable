import { RECEIVE_POSTS, ADD_POST, COUNT_VOTE } from '../actions/posts'

export default function posts (state = {}, action) {

  switch(action.type) {
    case RECEIVE_POSTS :
      return {
        ...state,
        ...action.posts
      }

    case ADD_POST: {
      return {
        ...state,
        ...action.post
      }
    }

    case COUNT_VOTE: {
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
