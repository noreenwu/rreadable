import React, { Fragment } from 'react'
import CategoryNav from './CategoryNav'

function Header ( props ) {


  return (
     <Fragment>
        <div className="app-title">
           Readable

        </div>
        <CategoryNav/>
     </Fragment>
  )
}

export default Header
