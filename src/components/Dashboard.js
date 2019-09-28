import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'

const TIMESTAMP = 'timestamp'
const VOTESCORE = 'votescore'

class Dashboard extends Component {

   state = {
      currentCat: 'all',
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

  render() {

    let { posts, categories } = this.props
    let workingPosts = posts

    console.log("state on render ", this.state)

    if (this.state.currentCat === 'all') {
       workingPosts = posts
    }
    else {
       // filter posts
       workingPosts = posts.filter(p => p.category === this.state.currentCat)
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

        <button
          className='btn'
          value='all'
          type='button'
          onClick={ (event) => this.handleChange(event.target.value)}
          key={'name'}
        >all
        </button>
       { categories.map(c =>
         <button
            className="btn"
            value={c.name}
            onClick={ (event) => this.handleChange(event.target.value)}
            key={c.name}>{c.name}
          </button>
        )}

       </div>


       { sortedPosts.length === 0
         ? <div> No posts in this category </div>
         : sortedPosts.map((p) =>
          <PostListItem key={p.id} id={p.id}/>
       )}
       </div>
    )
  }
}

function mapStateToProps( {posts, categories}) {
  return{
    defaultPosts: Object.values(posts),
    posts: Object.values(posts),
    categories: Object.values(categories)
  }

}
export default connect(mapStateToProps)(Dashboard)


// { this.props.posts.map(item => <PostListItem key={item.id} post={item} /> )}
