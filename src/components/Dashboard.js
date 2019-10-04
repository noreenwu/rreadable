import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'
import { Link  } from 'react-router-dom'
//import { savePost, deletePost } from '../utils/PostsAPI'
import CreatePost from './CreatePost'
import CategoryNav from './CategoryNav'

const TIMESTAMP = 'timestamp'
const VOTESCORE = 'votescore'
const READ = 'read'
const CREATE = 'create'


class Dashboard extends Component {

   state = {
      sortOrder: TIMESTAMP,
      mode: READ
  }

  // handleChange(val) {
  //
  //   this.setState({
  //     currentCat: val,
  //   })
  // }

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



  // showNewPostForm() {
  //   this.setState({
  //      mode: CREATE
  //   })
  // }

  // handleDelete() {
  //   console.log("hello handleDelete")
  //   // deletePost()
  // }


  render() {

    let { posts, category } = this.props
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

                >Timestamp
            </button>

            <button
                className='btn'
                value='VOTESCORE'
                type='button'
                onClick={ (event) => this.handleSortOrderChange(event.target.value)}

                >Score
            </button>

           </div>

           <CategoryNav />


           { sortedPosts.length === 0
             ? <div> No posts in the {category} category</div>
             : sortedPosts.map((p) =>
              <PostListItem key={p.id} id={p.id}/>
           )}


           <Link to={{
                pathname: `/${category}/create`,
                state: { category: category
                  }
                }}>
           <button className="btn">NEW Create New Post</button>
           </Link>

           { this.state.mode === CREATE
             ? <CreatePost />
             : null
           }

       </div>



    )
  }
}

function mapStateToProps( {posts, categories}, ownProps) {
  // let {category} = ownProps.match.params
  let category = ownProps.location.pathname.split('/').pop()

  if ( category === '') {
    category = 'all'
  }
  console.log("Dashboard: category", category)

  return{
    category,
    defaultPosts: Object.values(posts),
    posts: Object.values(posts),
    categories: Object.values(categories)
  }

}
export default connect(mapStateToProps)(Dashboard)


// { this.props.posts.map(item => <PostListItem key={item.id} post={item} /> )}
