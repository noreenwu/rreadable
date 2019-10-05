import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PostListItem from './PostListItem'
import { Link } from 'react-router-dom'
import Header from './Header'

const TIMESTAMP = 'timestamp'
const VOTESCORE = 'votescore'


class Dashboard extends Component {

   state = {
      sortOrder: TIMESTAMP,
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

    this.setState({
      sortOrder: sortOrder
    })
  }


  render() {

    let { workingPosts, category } = this.props

    let sortedPosts

    if (this.state.sortOrder === TIMESTAMP) {
      sortedPosts = workingPosts.sort((a,b) => b.timestamp - a.timestamp);
    }
    else if (this.state.sortOrder === VOTESCORE) {
      sortedPosts = workingPosts.sort((a,b) => b.voteScore - a.voteScore);
    }


    return(
       <Fragment>
           <Header />

           <div className="tiny-label">Sort by:</div>
           <div className="sortOrder">
            <button
                className='btn'
                value='TIMESTAMP'
                type='button'
                onClick={ (event) => this.handleSortOrderChange(event.target.value)}

                >Date
            </button>

            <button
                className='btn'
                value='VOTESCORE'
                type='button'
                onClick={ (event) => this.handleSortOrderChange(event.target.value)}

                >Score
            </button>

           </div>

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


       </Fragment>

    )
  }
}

function mapStateToProps( { posts }, ownProps) {

    let category = ownProps.location.pathname.split('/').pop()

    if ( category === '') {
      category = 'all'
    }

    let workingPosts = Object.values(posts)

    if (category !== 'all') {
       workingPosts = workingPosts.filter(p => p.category === category)
    }

    return{
      category,
      workingPosts: workingPosts,
    }
}

export default connect(mapStateToProps)(Dashboard)
