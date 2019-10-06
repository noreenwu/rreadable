import React, { Fragment } from 'react'
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux'

function CategoryNav ( props ) {

  const { categories } = props

  return (
    <Fragment>
      <div className="tiny-label">View Posts by Category:</div>
      <div className="category-list">
       <div className="nav-element">
       <Link to={'/'}>
       <button
         className={`btn btn-nav all-cat`}
       >all
       </button>
       </Link>
       </div>
      { categories.map(c =>
        <div className="nav-element" key={c.name}>
           <Link to={`/${c.path}`}>
               <button className={`btn btn-nav`}>{c.name}</button>
           </Link>
         </div>
       )}

      </div>
    </Fragment>
  )

}

function mapStateToProps( { categories} ) {

  return{
    categories: Object.values(categories)
  }

}
export default connect(mapStateToProps)(CategoryNav)
