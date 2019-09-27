import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'

class Dashboard extends Component {


  render() {
    console.log("Dashboard: ", this.props.posts.length)

    const { posts } = this.props

    return(
       <div>Dashboard
       { posts.map((p) =>
          <PostListItem key={p.id} id={p.id}/>
       )}
       </div>
    )
  }
}

function mapStateToProps( {posts, categories}) {
  return{
    posts: Object.values(posts),
    categories
  }

}
export default connect(mapStateToProps)(Dashboard)


// { this.props.posts.map(item => <PostListItem key={item.id} post={item} /> )}
