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
export function handleNewPost (post, id) {
  console.log("shared: handleNewPost post was ", post[id])
  // return(dispatch) => {
  //    //return savePost(post)
  //    return(console.log("some API call"))
  //       .then ((post) => dispatch( addPost(post)))
  // }


  savePost(post[id])  // not complaining on save but reloading reveals that something saved but not the info intended (mostly undefined)

  return (dispatch) => {
      dispatch(addPost(post))
  }
}
