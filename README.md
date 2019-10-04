# Project: Readable
# Noreen Wu
# Udacity React: October 2019

# Overview

## Installation


## Implementation Notes


## Required Files

index.js - creates the Redux store and wraps the app in Provider (for Redux) and BrowserRouter for routing

App.js - defines all the Routes and loads the initial data (posts and categories)

components/CategoryNav - contains navigation to the Dashboard by category (all, redux, react, udacity),
    and is included in each view


components/Comment.js - renders a comment when passed comment and post info from PostDetail. Comment
    is not connected through Redux. Comment contains links to up- and downVote a comment, and to
    edit and delete a comment. Voting does not make changes in Redux but updates the server via PostsAPI.


component/CreatePost.js - allows the user to create a new post. Input fields include author, title of post,
    and body of post. A dropdown allows the user to categorize the post, but if CreatePost was invoked
    (button clicked) from a category listing, then by default that category will be selected (but can be changed).

component/Dashboard.js - renders all the listing views: for example, all posts, redux posts, react posts, udacity posts.
    Allows any view to be sorted by either timestamp or score

    
