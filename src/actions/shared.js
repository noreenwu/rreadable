import { getInitialData } from '../utils/PostsAPI'
import { receivePosts } from '../actions/posts'
import { receiveCategories } from '../actions/categories'


export function handleInitialData () {
  return(dispatch) => {
    return getInitialData()
      .then(({ posts, categories }) => {
        dispatch(receivePosts(posts))
        dispatch(receiveCategories(categories))
      })
  }
}
