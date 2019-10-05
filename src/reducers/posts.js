import { RECEIVE_POSTS,
         ADD_POST,
         COUNT_VOTE,
         DELETE_POST,
         SAVE_EDITED_POST,
         UPDATE_NUM_COMMENTS } from '../actions/posts'

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

    case SAVE_EDITED_POST: {
        let postid = action.postid
        let newBody = action.post[postid].body
        let newTitle = action.post[postid].title
        let newTimestamp = action.post[postid].timestamp
        return {
          ...state,
          [action.postid] : {
            ...state[action.postid],
            body: newBody,
            title: newTitle,
            timestamp: newTimestamp
          }
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
        return {
          ...newState
        }
    }
    case UPDATE_NUM_COMMENTS: {
        let newCommentCount = action.post.commentCount + action.change
        if (newCommentCount < 0) {    // shouldn't happen, but...
          return {
            ...state
          }
        }
        return {
          ...state,
          [action.post.id] : {
            ...state[action.post.id],
            commentCount: newCommentCount
          }
        }
    }

    default :
      return state
   }
}
