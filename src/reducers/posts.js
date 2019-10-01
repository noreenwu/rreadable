import { RECEIVE_POSTS, ADD_POST, COUNT_VOTE, DELETE_POST } from '../actions/posts'

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
    case DELETE_POST: {
        let newState = Object.assign({}, state)
        delete newState[action.postid]
        console.log("DELETE_POST newState ", newState)
        return {
          ...newState
        }
    }

    default :
      return state
   }
}
