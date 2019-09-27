import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'

class Dashboard extends Component {

   state = {
      currentCat: 'all',
      // currentPosts: []
  }

  handleChange(val) {
    console.log("handleChange: ", val)

      // let newPosts = this.props.posts.filter(p => p.category === val)
      // console.log("newPosts ", newPosts)
      this.setState({
        currentCat: val,
        // currentPosts: newPosts
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




    return(
       <div>Dashboard
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


       { workingPosts.length === 0
         ? <div> No posts in this category </div>
         : workingPosts.map((p) =>
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
