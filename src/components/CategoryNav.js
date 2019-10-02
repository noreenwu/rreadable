import React from 'react'
import { Link  } from 'react-router-dom'
import { connect } from 'react-redux'

function CategoryNav ( props ) {

  const { categories } = props

  return (
    <div className="categoryList">

     <Link to={'/'}>
     <button
       className='btn'
     >all
     </button>
     </Link>
     
    { categories.map(c =>
      <div key={c.name}>
         <Link to={`/${c.path}`}>
             <button className='btn'>{c.name}</button>
         </Link>
       </div>
     )}

    </div>
  )

}

function mapStateToProps( { categories} ) {

  return{
    categories: Object.values(categories)
  }

}
export default connect(mapStateToProps)(CategoryNav)
