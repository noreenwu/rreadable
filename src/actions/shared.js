import { getInitialData, savePost } from '../utils/PostsAPI'
import { receivePosts, addPost } from '../actions/posts'
import { receiveCategories } from '../actions/categories'
import { setLoaded } from '../actions/loaded'

const LOADED = 'loaded'

export function handleInitialData () {
  return(dispatch) => {
    return getInitialData()
      .then(({ posts, categories }) => {
        dispatch(receivePosts(posts))
        dispatch(receiveCategories(categories))
        dispatch(setLoaded(LOADED))
      })
  }
}
export function handleNewPost (post) {
  console.log("shared: handleNewPost post was ", post)
  // return(dispatch) => {
  //    //return savePost(post)
  //    return(console.log("some API call"))
  //       .then ((post) => dispatch( addPost(post)))
  // }
  return (dispatch) => {
      dispatch(addPost(post))
  }
}
