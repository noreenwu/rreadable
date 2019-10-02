import React, { Component, Fragment } from "react";
//import * as PostsAPI from './utils/PostsAPI'
import LoadingBar from 'react-redux-loading-bar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Dashboard from './components/Dashboard'
import PostDetail from './components/PostDetail'
import EditPost from './components/EditPost'
import CreatePost from './components/CreatePost'
import './App.css';
import { handleInitialData } from './actions/shared'


class App extends Component {


  componentDidMount() {

    this.props.dispatch(handleInitialData())
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
              ? <div><LoadingBar/></div>
              : <Fragment>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/:category' exact component={Dashboard} />
                  <Route path='/:category/create' exact component={CreatePost} />
                  <Route path='/:category/:post_id' exact component={PostDetail} />
                  <Route path='/:category/:post_id/edit' exact component={EditPost} />

                </Switch>
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
