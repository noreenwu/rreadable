import { RECEIVE_POSTS, ADD_POST } from '../actions/posts'

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
    default :
      return state
   }
}
