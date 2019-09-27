import { SET_LOADED } from '../actions/loaded'

export default function loaded (state = null, action) {
  switch (action.type) {
    case SET_LOADED :
      return action.id
    default :
      return state
  }
}
