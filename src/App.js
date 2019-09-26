import React, { Component } from "react";
import * as PostsAPI from './utils/PostsAPI'
import LoadingBar from 'react-redux-loading-bar'
import Dashboard from './components/Dashboard'
import './App.css';

class App extends Component {

  state = {
    categories: [],
    posts: "posts",
    comments: "comments",
    loading: true,
    catsLoading: true,
  };

  componentDidMount() {

    PostsAPI.getAllCategories()
     .then((categories) => {
         this.setState(() => ({
           categories
         }))
      })
     .then((res) => {
         this.setState({ catsLoading: false })
     })



   PostsAPI.getAllPosts()
      .then((posts) => {
     console.log("App data", posts)
         this.setState({
               posts
           });
       })
     .then((res) => {
         this.setState({ loading: false })
     })

  }



  render() {
    console.log("what is this", this.state)
  	if ( this.state.loading === true || this.state.catsLoading === true )
   		return( <LoadingBar/> )

    return (
      <div className="App">

          Hello
          <Dashboard />

      </div>
    )
  }
}

export default App;
