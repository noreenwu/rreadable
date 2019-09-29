import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import PostListItem from './PostListItem'
//import { savePost, deletePost } from '../utils/PostsAPI'
import { handleNewPost } from '../actions/shared'

const TIMESTAMP = 'timestamp'
const VOTESCORE = 'votescore'

class Dashboard extends Component {

   state = {
      sortOrder: TIMESTAMP
  }

  handleChange(val) {

    this.setState({
      currentCat: val,
    })
  }

  handleSortOrderChange(val) {
     let sortOrder
     if (val === 'TIMESTAMP') {
        sortOrder = TIMESTAMP
     }
     else if (val === 'VOTESCORE') {
        sortOrder = VOTESCORE
     }
     else {
       return // invalid sort order specified
     }
     console.log("handlesortorderchange ", sortOrder)
      this.setState({
        sortOrder: sortOrder,
      })
  }

  handleNew() {
    const { dispatch } = this.props
    const dummyPost = { '111' : { id: '111',
                                  timestamp: Date.now(),
                                  title: 'Aloha',
                                  body: 'are you kidding',
                                  author: 'Mr. Smith',
                                  category: 'redux'
                                }
                      }

    console.log("hello handleNew")
    dispatch(handleNewPost(dummyPost))
  }

  handleDelete() {
    console.log("hello handleDelete")
    // deletePost()
  }

  render() {

    let { posts, categories, category } = this.props
    let workingPosts = posts

    if (category === 'all') {
       workingPosts = posts
    }
    else {
       // filter posts
       workingPosts = posts.filter(p => p.category === category)
    }

    let sortedPosts

    if (this.state.sortOrder === TIMESTAMP) {
      sortedPosts = workingPosts.sort((a,b) => b.timestamp - a.timestamp);
    }
    else if (this.state.sortOrder === VOTESCORE) {
      sortedPosts = workingPosts.sort((a,b) => b.voteScore - a.voteScore);
    }


    return(
       <div>Dashboard

           <div className="sortOrder">
            <button
                className='btn'
                value='TIMESTAMP'
                type='button'
                onClick={ (event) => this.handleSortOrderChange(event.target.value)}
                key='time'
                >Timestamp
            </button>

            <button
                className='btn'
                value='VOTESCORE'
                type='button'
                onClick={ (event) => this.handleSortOrderChange(event.target.value)}
                key='vote'
                >Score
            </button>

           </div>

           <div className="categoryList">

            <Link to={'/'}>
            <button
              className='btn'
            >all
            </button>
            </Link>
           { categories.map(c =>
             <Fragment key={c.name}>
                <Link to={`/${c.path}`}>
                    <button className='btn'>{c.name}</button>
                </Link>
              </Fragment>
            )}

           </div>

           { sortedPosts.length === 0
             ? <div> No posts in this category </div>
             : sortedPosts.map((p) =>
              <PostListItem key={p.id} id={p.id}/>
           )}

           <div onClick={() => this.handleNew()}>Create new post test</div>

           <div onClick={() => this.handleDelete()}>Delete post test</div>

       </div>



    )
  }
}

function mapStateToProps( {posts, categories}, ownProps) {
  let {category} = ownProps.match.params

  if ( category === undefined ) {
    category = 'all'
  }

  return{
    category,
    defaultPosts: Object.values(posts),
    posts: Object.values(posts),
    categories: Object.values(categories)
  }

}
export default connect(mapStateToProps)(Dashboard)


// { this.props.posts.map(item => <PostListItem key={item.id} post={item} /> )}
