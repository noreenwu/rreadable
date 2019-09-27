import React, { Component, Fragment } from "react";
//import * as PostsAPI from './utils/PostsAPI'
import LoadingBar from 'react-redux-loading-bar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './components/Dashboard'
import './App.css';
import { handleInitialData } from './actions/shared'


class App extends Component {

  // state = {
  //   categories: [],
  //   posts: "posts",
  //   comments: "comments",
  //   loading: true,
  //   catsLoading: true,
  // };

  componentDidMount() {
    this.props.dispatch(handleInitialData())
   //  PostsAPI.getAllCategories()
   //   .then((categories) => {
   //       this.setState(() => ({
   //         categories
   //       }))
   //    })
   //   .then((res) => {
   //       this.setState({ catsLoading: false })
   //   })
   //
   //
   //
   // PostsAPI.getAllPosts()
   //    .then((posts) => {
   //   console.log("App data", posts)
   //       this.setState({
   //             posts
   //         });
   //     })
   //   .then((res) => {
   //       this.setState({ loading: false })
   //   })

  }



  render() {
    // console.log("what is this", this.state)
  	// if ( this.state.loading === true || this.state.catsLoading === true )
   	// 	return( <LoadingBar/> )

    return (

      <Router>
        <Fragment>
          <div className="container">
            { this.props.loading === true
              ? <LoadingBar/>
              : <Fragment>
                  <Dashboard/>
                </Fragment>
            }
          </div>
        </Fragment>
      </Router>

    )
  }
}

function mapStateToProps ({ loaded }) {

  return {
    hello: 1,
    loading: loaded === null
  }
}
export default connect(mapStateToProps)(App)
