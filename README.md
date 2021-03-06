# Noreen Wu
# Udacity React: October 2019
# Project: Readable

# Overview

This is a content and comment web application built using React and Redux as the front-end,
and interfacing with an api-server backend. Users can post content into the available categories
and then make comments on their own or others' posts. Both posts and comments can be voted on,
edited, and deleted.


## Installation

To install this project, first download the api-server from
https://github.com/udacity/reactnd-project-readable-starter.
As the server README describes, cd into api-server and run npm install.
Then run "node server."

In a separate directory, download this front-end UI piece from
https://github.com/noreenwu/rreadable.
Then from within the rreadable directory, run npm install and
then npm start, to launch the app.


## Implementation Notes

This implementation utilizes Redux to maintain state for posts and categories, but not for comments.
Comments are not global in nature, and so instead, they are retrieved from the server on a per post basis.

react-router-dom is utilized to help with navigation, and so sometimes the local state of
a component is initialized via a setting in Link, and defined when the user clicks to move from
one component to another, for example, if editing or creating a post or comment.

Note that the timestamp updates when posts and comments are edited. This means that comments can end up
having earlier timestamps than their parent posts.


## Required Files

index.js - creates the Redux store and wraps the app in Provider (for Redux) and BrowserRouter for routing

App.js - defines all the Routes and loads the initial data (posts and categories)

components/CategoryNav - contains navigation to the Dashboard by category (all, redux, react, udacity),
    and is included in each view


components/Comment.js - renders a comment when passed comment and post info from PostDetail. Comment
    is not connected through Redux. Comment contains links to up- and downVote a comment, and to
    edit and delete a comment. Voting does not make changes in Redux but updates the server via PostsAPI.


components/CreatePost.js - allows the user to create a new post. Input fields include author, title of post,
    and body of post. A dropdown allows the user to categorize the post, but if CreatePost was invoked
    (button clicked) from a category listing, then by default that category will be selected (but can be changed).

components/Dashboard.js - renders all the listing views: for example, all posts, redux posts, react posts, udacity posts.
    Allows any view to be sorted by either timestamp or score


components/EditComment.js -


components/EditPost.js - Allows a post to be edited. EditPost is invoked from the PostTitle component, via a Link which
   includes the current post as the starting state. EditPost utilizes componentDidMount to pick up this state, so
   that the input fields are populated with the original post's information, for editing.


components/NewComment.js -  a button to create a new comment appears at the bottom of the PostDetail page; if other
   comments are present for the post, it appears below them. NewComment provides the user with 2 input fields:
   author and comment (body). It obtains the post information (its parent) from Link on the PostDetail page, and
   uses this info, both to display some context for the new comment and also as part of the server request to add
   the comment. The new comment id and timestamp are generated by helper functions, and the parentId is the id of the post
   that this comment is associated with.

components/PostBody.js - this stateless functional component renders the body of a post. This allows the post header
   and title information to be rendered separately from the body in different views, without the body.

components/PostDetail.js - when the user clicks on a post title from one of the listing views, s/he is taken to
   the PostDetail page. The full content of the post is displayed here, along with any associated comments. The
   comments don't live in the Redux store, but are pulled from the server each time PostDetail is rendered.


components/PostHeader.js - this renders for a specific post the post's category, author, date posted and comment count.
   The correct comment count is supplied by the server, based on the number of comments associated with the post.


components/PostListItem.js - Dashboard calls PostListItem for each post on its current list. PostListItem renders
    PostHeader and PostTitle for these listings.


components/PostTitle.js - renders the title of the specific post that the user had entered. Contains links to the
    post functions for up and downVoting, editing and deleting, passing along the necessary post information
    and dispatching actions for saving changes in Redux and also issuing server functions to save changes
    (for deleting the post and voting). This component also needs to compute the pathname of the view that is shown
    following these actions, so that deleting a post, for example, brings the user back to the appropriate category
    listing page, or editing a post navigates to the EditPost page.


actions/categories.js - the loading of the category data is dispatched as soon as the app is loaded, in the
    componentDidMount function of App.js. That's about it, since categories are not modified in this app.
    But having categories in the state allows access to them from any component.

actions/posts.js - the loading of the posts data is dispatched when the app is loaded, in App.js. In addition,
    all changes made to posts involve dispatching an action defined in this file, whether to add a new post,
    delete a post, change the voteScore of a post or change the number of comments associated with a post.

actions/shared.js - facilitates the combined loading of the categories and posts at application startup

reducers/categories.js - the receiving of the categories loading, specifically the merging of categories
     pulled from the server with the initially blank category state, is defined here

reducers/posts.js - the slice of state for posts is maintained by these posts reducers. Once the posts are
     loaded, the other reducers deal with a single post, identified by a post id: to create a post,
     save edits to a post, change the vote score of a post, delete a post, or change the number of comments
     associated with a post.

reducers/index.js - this file contains the combineReducers function which allows actions to effect changes
     via both posts and categories reducers. But we only take advantage of this combination in this app
     in the loading of categories and initial posts process.

utils/helpers.js - contains helper functions for formatting the date into human recognizable form
    (instead of Unix time) and for generating a new unique id for either a new post or new comment

utils/PostsAPI.js - contains functions which interface directly with the api server, such as
    to fetch all posts, fetch all categories, to fetch comments associated with a post, to save a post
    to the server (via POST), to save changes to a post (via PUT), to delete a post (DELETE), to
    updating the voting values for a post (PUT), as well as all of the changes that may be made
    to comments: creating a new comment, editing a comment, voting on a comment, and deleting a comment.

middleware/index.js and middleware/logger.js - these files display to the console the current state any time
    an action is dispatched
